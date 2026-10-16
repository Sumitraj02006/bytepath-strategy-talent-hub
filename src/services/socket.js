import { io } from 'socket.io-client';
import { Peer } from 'peerjs';

// Environment socket server or default
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4001';

// Shared Cloud Peer ID for Cross-Device Sync (Phone <-> Laptop across the internet)
const CLOUD_ADMIN_PEER_ID = 'bytepath-admin-cloud-stream';

class SocketService {
  constructor() {
    this.socket = null;
    this.peer = null;
    this.peerConnections = new Set();
    this.activePeerConnToAdmin = null;
    this.isConnected = false;
    this.cloudPeerConnected = false;
    this.currentRole = 'user';
    this.userName = 'Viewer';
    this.eventListeners = new Map();
    this.reconnectTimer = null;
  }

  connect(role = 'admin', name = 'Mayank Gaur') {
    this.currentRole = role;
    this.userName = name;

    // 1. Initialize Socket.io (for local dev or if backend is hosted on Render/Railway)
    this.initSocketIo();

    // 2. Initialize Cloud WebRTC Peer (for Vercel cross-device phone-to-laptop sync)
    this.initCloudPeer();

    return this;
  }

  initSocketIo() {
    try {
      if (this.socket && this.socket.connected) {
        this.socket.emit('register_role', { role: this.currentRole, name: this.userName });
        return;
      }

      this.socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        timeout: 5000,
        autoConnect: true
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log(`[Socket.io] Connected with ID: ${this.socket.id}`);
        this.socket.emit('register_role', { role: this.currentRole, name: this.userName });
        this.updateConnectionStatus();
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        this.updateConnectionStatus();
      });

      this.socket.on('connect_error', () => {
        this.isConnected = false;
        this.updateConnectionStatus();
      });

      this.socket.on('presence_update', (stats) => {
        this.triggerCallbacks('presence', stats);
      });

      this.socket.on('sync_update', (syncData) => {
        this.triggerCallbacks('sync_update', syncData);
      });

      this.socket.on('live_announcement', (announcement) => {
        this.triggerCallbacks('announcement', announcement);
      });

      this.socket.on('live_announcement_cleared', () => {
        this.triggerCallbacks('announcement_cleared', null);
      });

    } catch (e) {
      console.warn('[Socket.io] Init skipped, relying on Cloud Peer:', e);
    }
  }

  initCloudPeer() {
    try {
      if (this.peer && !this.peer.destroyed) {
        return;
      }

      if (this.currentRole === 'admin') {
        // Admin acts as the Cloud Broadcaster Hub
        this.peer = new Peer(CLOUD_ADMIN_PEER_ID, {
          debug: 1
        });

        this.peer.on('open', (id) => {
          console.log(`[Cloud Peer] Admin Broadcaster ready on Cloud with ID: ${id}`);
          this.cloudPeerConnected = true;
          this.updateConnectionStatus();
        });

        this.peer.on('connection', (conn) => {
          console.log(`[Cloud Peer] Viewer/Laptop connected to Admin!`);
          this.peerConnections.add(conn);

          conn.on('open', () => {
            this.triggerCallbacks('presence', {
              admins: 1,
              users: this.peerConnections.size,
              total: this.peerConnections.size + 1
            });
          });

          conn.on('close', () => {
            this.peerConnections.delete(conn);
            this.triggerCallbacks('presence', {
              admins: 1,
              users: this.peerConnections.size,
              total: this.peerConnections.size + 1
            });
          });
        });

        this.peer.on('error', (err) => {
          if (err.type === 'unavailable-id') {
            console.log('[Cloud Peer] Admin ID already registered by another session, connecting as secondary admin...');
            this.peer = new Peer({ debug: 1 });
          }
          this.cloudPeerConnected = false;
          this.updateConnectionStatus();
        });

      } else {
        // User / Mayank Dashboard acts as Receiver
        this.peer = new Peer({ debug: 1 });

        this.peer.on('open', (id) => {
          console.log(`[Cloud Peer] Mayank Dashboard Receiver ready: ${id}`);
          this.connectToAdminPeer();
        });

        this.peer.on('error', (err) => {
          console.warn('[Cloud Peer] Receiver error:', err.message);
        });
      }

    } catch (err) {
      console.warn('[Cloud Peer] WebRTC not supported or blocked:', err);
    }
  }

  connectToAdminPeer() {
    if (!this.peer || this.peer.destroyed) return;

    try {
      const conn = this.peer.connect(CLOUD_ADMIN_PEER_ID, { reliable: true });

      conn.on('open', () => {
        console.log('[Cloud Peer] Successfully connected to Admin phone/stream!');
        this.activePeerConnToAdmin = conn;
        this.cloudPeerConnected = true;
        this.updateConnectionStatus();
      });

      conn.on('data', (data) => {
        console.log('[Cloud Peer] Received cross-device update:', data);
        if (data.type === 'sync_update') {
          this.triggerCallbacks('sync_update', data.payload);
        } else if (data.type === 'announcement') {
          this.triggerCallbacks('announcement', data.payload);
        } else if (data.type === 'announcement_cleared') {
          this.triggerCallbacks('announcement_cleared', null);
        }
      });

      conn.on('close', () => {
        console.log('[Cloud Peer] Disconnected from Admin. Reconnecting in 3s...');
        this.cloudPeerConnected = false;
        this.activePeerConnToAdmin = null;
        this.updateConnectionStatus();
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.connectToAdminPeer(), 3000);
      });

      conn.on('error', () => {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = setTimeout(() => this.connectToAdminPeer(), 4000);
      });

    } catch (e) {
      console.warn('[Cloud Peer] Failed to connect to admin:', e);
    }
  }

  updateConnectionStatus() {
    const isAnyConnected = this.isConnected || this.cloudPeerConnected;
    this.triggerCallbacks('connection_status', {
      connected: isAnyConnected,
      socketConnected: this.isConnected,
      cloudPeerConnected: this.cloudPeerConnected
    });
  }

  setRole(role, name) {
    if (this.currentRole !== role) {
      this.currentRole = role;
      if (name) this.userName = name;
      if (this.peer) {
        this.peer.destroy();
        this.peer = null;
      }
      this.connect(role, this.userName);
    }
  }

  // Admin action emitter (Sends to both Socket.io and Cloud WebRTC Peer connections)
  emitAdminAction(actionType, payload, message) {
    const syncData = {
      actionType,
      payload,
      message,
      sender: this.userName || 'Admin (Phone)',
      timestamp: Date.now()
    };

    // 1. Send via Socket.io if available
    if (this.socket && this.isConnected) {
      this.socket.emit('admin_action', {
        actionType,
        payload,
        message,
        role: this.currentRole
      });
    }

    // 2. Broadcast via Cloud WebRTC to connected devices (Phone -> Laptop)
    if (this.peerConnections && this.peerConnections.size > 0) {
      this.peerConnections.forEach((conn) => {
        try {
          if (conn.open) {
            conn.send({ type: 'sync_update', payload: syncData });
          }
        } catch (e) {
          console.warn('[Cloud Peer] Send failed:', e);
        }
      });
    }

    return true;
  }

  // Admin announcement emitter
  emitAnnouncement(title, message, priority = 'high') {
    const announcement = {
      id: `ann-${Date.now()}`,
      title,
      message,
      priority,
      sender: 'Mayank Gaur (Admin)',
      timestamp: Date.now()
    };

    if (this.socket && this.isConnected) {
      this.socket.emit('admin_announcement', { title, message, priority });
    }

    if (this.peerConnections && this.peerConnections.size > 0) {
      this.peerConnections.forEach((conn) => {
        try {
          if (conn.open) {
            conn.send({ type: 'announcement', payload: announcement });
          }
        } catch (e) {}
      });
    }

    return true;
  }

  clearAnnouncement() {
    if (this.socket && this.isConnected) {
      this.socket.emit('clear_announcement');
    }

    if (this.peerConnections && this.peerConnections.size > 0) {
      this.peerConnections.forEach((conn) => {
        try {
          if (conn.open) {
            conn.send({ type: 'announcement_cleared' });
          }
        } catch (e) {}
      });
    }

    return true;
  }

  subscribe(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);

    return () => {
      if (this.eventListeners.has(event)) {
        this.eventListeners.get(event).delete(callback);
      }
    };
  }

  triggerCallbacks(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in listener for ${event}:`, e);
        }
      });
    }
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
    if (this.peer) this.peer.destroy();
    this.isConnected = false;
    this.cloudPeerConnected = false;
  }
}

export const socketService = new SocketService();

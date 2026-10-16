import { io } from 'socket.io-client';

// Use same host or fallback to port 4001
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4001';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.currentRole = 'user';
    this.userName = 'Viewer';
    this.eventListeners = new Map();
  }

  connect(role = 'admin', name = 'Mayank Gaur') {
    this.currentRole = role;
    this.userName = name;

    if (this.socket && this.socket.connected) {
      this.socket.emit('register_role', { role, name });
      return this.socket;
    }

    try {
      this.socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        timeout: 10000,
        autoConnect: true
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log(`[Socket.io Client] Connected with ID: ${this.socket.id}`);
        this.socket.emit('register_role', { role: this.currentRole, name: this.userName });
        this.triggerCallbacks('connection_status', { connected: true, socketId: this.socket.id });
      });

      this.socket.on('disconnect', (reason) => {
        this.isConnected = false;
        console.log(`[Socket.io Client] Disconnected: ${reason}`);
        this.triggerCallbacks('connection_status', { connected: false, reason });
      });

      this.socket.on('connect_error', (error) => {
        this.isConnected = false;
        console.warn(`[Socket.io Client] Connection error:`, error.message);
        this.triggerCallbacks('connection_status', { connected: false, error: error.message });
      });

      this.socket.on('presence_update', (stats) => {
        this.triggerCallbacks('presence', stats);
      });

      this.socket.on('sync_update', (syncData) => {
        console.log('[Socket.io Client] Received sync_update:', syncData);
        this.triggerCallbacks('sync_update', syncData);
      });

      this.socket.on('live_announcement', (announcement) => {
        this.triggerCallbacks('announcement', announcement);
      });

      this.socket.on('live_announcement_cleared', () => {
        this.triggerCallbacks('announcement_cleared', null);
      });

      this.socket.on('connection_established', (data) => {
        if (data.presence) this.triggerCallbacks('presence', data.presence);
        if (data.activeAnnouncement) this.triggerCallbacks('announcement', data.activeAnnouncement);
      });

    } catch (err) {
      console.error('[Socket.io Client] Init failed:', err);
    }

    return this.socket;
  }

  setRole(role, name) {
    this.currentRole = role;
    if (name) this.userName = name;
    if (this.socket && this.socket.connected) {
      this.socket.emit('register_role', { role: this.currentRole, name: this.userName });
    }
  }

  // Admin action emitter
  emitAdminAction(actionType, payload, message) {
    if (!this.socket || !this.isConnected) {
      console.warn('[Socket.io] Cannot emit action: Socket not connected');
      return false;
    }

    this.socket.emit('admin_action', {
      actionType,
      payload,
      message,
      role: this.currentRole
    });
    return true;
  }

  // Admin announcement emitter
  emitAnnouncement(title, message, priority = 'high') {
    if (!this.socket || !this.isConnected) return false;
    this.socket.emit('admin_announcement', { title, message, priority });
    return true;
  }

  // Clear announcement
  clearAnnouncement() {
    if (!this.socket || !this.isConnected) return false;
    this.socket.emit('clear_announcement');
    return true;
  }

  // Event subscription helper
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
      this.eventListeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in socket listener for ${event}:`, e);
        }
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}

export const socketService = new SocketService();

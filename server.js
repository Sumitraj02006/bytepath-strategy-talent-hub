import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);

// Initialize Socket.io with permissive CORS for local dev
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 4001;

// In-memory tracking of active clients
const connectedClients = new Map();
let lastSyncEvent = null;
let activeAnnouncement = null;

const getPresenceStats = () => {
  let admins = 0;
  let users = 0;
  for (const client of connectedClients.values()) {
    if (client.role === 'admin') admins++;
    else users++;
  }
  return {
    admins,
    users,
    total: connectedClients.size
  };
};

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'BytePath Realtime Socket.io Server',
    presence: getPresenceStats(),
    lastSyncEvent,
    activeAnnouncement
  });
});

io.on('connection', (socket) => {
  const socketId = socket.id;
  // Default connection registration
  connectedClients.set(socketId, { role: 'user', name: 'Guest Viewer' });
  console.log(`[Socket.io] Client connected: ${socketId}`);

  // Send current server status & stats immediately
  socket.emit('connection_established', {
    socketId,
    presence: getPresenceStats(),
    activeAnnouncement
  });

  // Broadcast updated presence to all clients
  io.emit('presence_update', getPresenceStats());

  // Handle client role registration (Admin vs User)
  socket.on('register_role', ({ role, name }) => {
    connectedClients.set(socketId, {
      role: role || 'user',
      name: name || (role === 'admin' ? 'Mayank Gaur (Admin)' : 'Viewer')
    });
    console.log(`[Socket.io] Client ${socketId} registered as: ${role.toUpperCase()}`);
    io.emit('presence_update', getPresenceStats());
  });

  // Handle Admin Action (Candidate updated, Strategy added, Task toggled, etc.)
  socket.on('admin_action', (data) => {
    const sender = connectedClients.get(socketId) || { role: 'unknown', name: 'Unknown' };
    console.log(`[Socket.io] Admin Action received from ${sender.name}:`, data.actionType);

    const syncPayload = {
      ...data,
      sender: sender.name,
      senderId: socketId,
      timestamp: Date.now()
    };

    lastSyncEvent = syncPayload;

    // Broadcast to all other clients (especially user panels)
    // and send ack back to sender
    socket.broadcast.emit('sync_update', syncPayload);
    socket.emit('admin_action_acknowledged', { success: true, timestamp: Date.now() });
  });

  // Handle Live Admin Announcements
  socket.on('admin_announcement', (announcementData) => {
    const announcement = {
      id: `ann-${Date.now()}`,
      title: announcementData.title || 'Official Announcement',
      message: announcementData.message,
      priority: announcementData.priority || 'high',
      sender: 'Mayank Gaur (Admin)',
      timestamp: Date.now()
    };

    activeAnnouncement = announcement;
    console.log('[Socket.io] Broadcasting Announcement:', announcement.title);

    // Broadcast announcement to ALL connected clients
    io.emit('live_announcement', announcement);
  });

  // Handle clearing announcement
  socket.on('clear_announcement', () => {
    activeAnnouncement = null;
    io.emit('live_announcement_cleared');
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    connectedClients.delete(socketId);
    console.log(`[Socket.io] Client disconnected: ${socketId}`);
    io.emit('presence_update', getPresenceStats());
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 BytePath Socket.io Server running on http://localhost:${PORT}`);
  console.log(`📡 Realtime Admin <-> User synchronization active!`);
  console.log(`=======================================================`);
});

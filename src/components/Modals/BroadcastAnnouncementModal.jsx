import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Icon } from '../Icons';

export const BroadcastAnnouncementModal = ({ isOpen, onClose }) => {
  const { sendLiveAnnouncement, clearLiveAnnouncement, activeAnnouncement } = useDashboard();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('high');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    sendLiveAnnouncement(title.trim(), message.trim(), priority);
    setTitle('');
    setMessage('');
    onClose();
  };

  const handleClear = () => {
    clearLiveAnnouncement();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📢</span> Broadcast Live Announcement
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Broadcasts instantly to all connected User panels in real-time via Socket.io.
            </p>
          </div>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Announcement Headline *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Campus Placement Drive Shortlist Announced"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message Content *</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Type the message that will pop up on all User screens immediately..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Broadcast Priority</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className={`tab-pill ${priority === 'high' ? 'active' : ''}`}
                  onClick={() => setPriority('high')}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  ⚡ High Priority (Blue/Purple)
                </button>
                <button
                  type="button"
                  className={`tab-pill ${priority === 'urgent' ? 'active' : ''}`}
                  onClick={() => setPriority('urgent')}
                  style={{ flex: 1, textAlign: 'center', borderColor: priority === 'urgent' ? '#EF4444' : '' }}
                >
                  🚨 Urgent Alert (Red)
                </button>
              </div>
            </div>

            {activeAnnouncement && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                marginTop: '8px'
              }}>
                <div style={{ fontSize: '0.78rem', color: '#EF4444', fontWeight: '700' }}>Active Announcement on Screens:</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '2px' }}>{activeAnnouncement.title}</div>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-danger"
                  style={{ marginTop: '8px', padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  Clear Active Banner
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: priority === 'urgent'
                  ? 'linear-gradient(135deg, #DC2626, #EF4444)'
                  : 'linear-gradient(135deg, #2563EB, #7C3AED)'
              }}
            >
              🚀 Broadcast Live via Socket.io
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

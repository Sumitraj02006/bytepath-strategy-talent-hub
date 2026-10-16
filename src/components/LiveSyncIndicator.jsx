import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const LiveSyncIndicator = () => {
  const {
    userRole,
    setUserRole,
    socketConnected,
    presenceStats,
    liveToast,
    dismissLiveToast,
    activeAnnouncement,
    dismissActiveAnnouncement,
    onOpenBroadcastModal
  } = useDashboard();

  const handleOpenUserWindow = () => {
    const userUrl = `${window.location.origin}${window.location.pathname}?role=user`;
    window.open(userUrl, '_blank', 'width=1200,height=800');
  };

  return (
    <>
      {/* 1. Global Live Announcement Banner (Broadcasted from Admin to Users) */}
      {activeAnnouncement && (
        <div style={{
          background: activeAnnouncement.priority === 'urgent'
            ? 'linear-gradient(90deg, #DC2626, #EF4444)'
            : 'linear-gradient(90deg, #2563EB, #7C3AED)',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          animation: 'slideDown 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'inline-flex',
              padding: '4px 8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              fontWeight: '800',
              fontSize: '0.75rem',
              letterSpacing: '0.5px'
            }}>
              📢 LIVE ANNOUNCEMENT
            </span>
            <div>
              <strong style={{ fontSize: '0.9rem', marginRight: '8px' }}>
                {activeAnnouncement.title}:
              </strong>
              <span style={{ fontSize: '0.85rem', opacity: 0.95 }}>
                {activeAnnouncement.message}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              via {activeAnnouncement.sender || 'Admin'}
            </span>
            <button
              onClick={dismissActiveAnnouncement}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '700'
              }}
              title="Dismiss announcement"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Real-time Sync Toast (Triggers when Admin modifies data) */}
      {liveToast && liveToast.show && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0F172A',
          border: '1px solid #3B82F6',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.7), 0 0 15px rgba(59, 130, 246, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          zIndex: 1000,
          maxWidth: '420px',
          animation: 'bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid #06B6D4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ fontSize: '18px' }}>⚡</span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#06B6D4',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Socket.io Live Sync
              </span>
              <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Just now</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: '500', lineHeight: '1.3' }}>
              {liveToast.message}
            </div>
            {userRole === 'user' && (
              <div style={{ fontSize: '0.72rem', color: '#10B981', marginTop: '4px', fontWeight: '600' }}>
                ✓ Synced automatically to your User screen
              </div>
            )}
          </div>

          <button
            onClick={dismissLiveToast}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export const RoleHeaderBar = ({ onOpenBroadcastModal }) => {
  const { userRole, setUserRole, socketConnected, presenceStats } = useDashboard();

  const handleOpenUserWindow = () => {
    const userUrl = `${window.location.origin}${window.location.pathname}?role=user`;
    window.open(userUrl, '_blank', 'width=1200,height=800');
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
      {/* Socket Status & Presence Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: socketConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        border: `1px solid ${socketConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.78rem'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: socketConnected ? '#10B981' : '#EF4444',
          boxShadow: socketConnected ? '0 0 8px #10B981' : '0 0 8px #EF4444',
          animation: socketConnected ? 'pulse 2s infinite' : 'none'
        }} />
        <span style={{ fontWeight: '600', color: socketConnected ? '#10B981' : '#EF4444' }}>
          {socketConnected ? 'Socket.io Live' : 'Connecting Server...'}
        </span>
        {socketConnected && (
          <span style={{ color: 'var(--text-muted)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '8px' }}>
            {presenceStats.admins} Admin, {presenceStats.users} User
          </span>
        )}
      </div>

      {/* Admin vs User Role Toggle Switch */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '2px'
      }}>
        <button
          onClick={() => setUserRole('admin')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: userRole === 'admin'
              ? 'linear-gradient(135deg, #06B6D4, #3B82F6)'
              : 'transparent',
            color: userRole === 'admin' ? '#fff' : 'var(--text-secondary)'
          }}
          title="Full editing and management permissions"
        >
          <span>👑</span> Admin Panel
        </button>

        <button
          onClick={() => setUserRole('user')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '20px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: userRole === 'user'
              ? 'linear-gradient(135deg, #10B981, #059669)'
              : 'transparent',
            color: userRole === 'user' ? '#fff' : 'var(--text-secondary)'
          }}
          title="Viewer view with real-time sync updates"
        >
          <span>👁️</span> User Panel
        </button>
      </div>

      {/* Quick Test Helper Button (Open User View in New Window) */}
      {userRole === 'admin' && (
        <>
          <button
            onClick={onOpenBroadcastModal}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderColor: 'rgba(139, 92, 246, 0.4)',
              color: '#C084FC'
            }}
            title="Broadcast announcement to all user screens"
          >
            <span>📢</span> Broadcast Alert
          </button>

          <button
            onClick={handleOpenUserWindow}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(6, 182, 212, 0.08)',
              borderColor: 'rgba(6, 182, 212, 0.3)',
              color: 'var(--accent-cyan)'
            }}
            title="Open a User Panel window side-by-side to test real-time Socket.io updates!"
          >
            <span>🔗</span> Test User Window
          </button>
        </>
      )}
    </div>
  );
};

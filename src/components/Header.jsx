import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';
import { NotificationsPanel } from './NotificationsPanel';
import { RoleHeaderBar } from './LiveSyncIndicator';

export const Header = ({ mobileOpen, setMobileOpen }) => {
  const { unreadNotifCount, isNotifOpen, setIsNotifOpen, setIsSearchOpen, setActiveTab, userRole, setIsBroadcastOpen } = useDashboard();
  const [currentDate, setCurrentDate] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="btn btn-secondary btn-icon-only"
          style={{ display: 'none' }}
          id="mobile-menu-btn"
        >
          <Icon name="menu" size={20} />
        </button>

        <div className="header-user-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2>
              {userRole === 'admin' ? 'Mayank Gaur' : 'Guest Viewer / Student'}
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: userRole === 'admin' ? '#10B981' : '#06B6D4',
                boxShadow: userRole === 'admin' ? '0 0 8px #10B981' : '0 0 8px #06B6D4',
                marginLeft: '6px'
              }} title="Command Center Active"></span>
            </h2>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: userRole === 'admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              color: userRole === 'admin' ? '#60A5FA' : '#34D399',
              border: `1px solid ${userRole === 'admin' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`
            }}>
              {userRole === 'admin' ? '👑 ADMIN PANEL' : '👁️ USER PANEL'}
            </span>
          </div>
          <p>{userRole === 'admin' ? 'Head of Strategy, Research & Talent Acquisition' : 'Real-time Synchronized Read-Only Access'}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Socket.io Live Status and Admin/User Switcher */}
        <RoleHeaderBar onOpenBroadcastModal={() => setIsBroadcastOpen(true)} />

        <div className="date-pill">
          <Icon name="calendar" size={14} color="var(--accent-cyan)" />
          <span>{currentDate}</span>
        </div>

        <button className="search-bar-trigger" onClick={() => setIsSearchOpen(true)}>
          <Icon name="search" size={16} />
          <span>Search...</span>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="notif-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
            <Icon name="bell" size={18} />
            {unreadNotifCount > 0 && (
              <span className="notif-badge">{unreadNotifCount}</span>
            )}
          </button>

          <NotificationsPanel />
        </div>

        {/* Profile Menu Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              padding: '4px 10px 4px 6px',
              borderRadius: '24px',
              cursor: 'pointer'
            }}
          >
            <div className="user-avatar-sm" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>MG</div>
            <Icon name="chevron-down" size={14} color="var(--text-secondary)" />
          </button>

          {profileOpen && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: '0',
              width: '220px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '8px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
              zIndex: 150
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.85rem' }}>Mayank Gaur</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>mayank.gaur@bytepath.edu</div>
              </div>

              <button
                onClick={() => { setActiveTab('settings'); setProfileOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon name="settings" size={14} />
                <span>Command Settings</span>
              </button>

              <button
                onClick={() => { setActiveTab('reports'); setProfileOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon name="reports" size={14} />
                <span>Weekly Strategy Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

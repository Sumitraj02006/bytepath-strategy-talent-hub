import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const NotificationsPanel = () => {
  const { notifications, isNotifOpen, setIsNotifOpen, markAllNotificationsRead, setActiveTab } = useDashboard();

  if (!isNotifOpen) return null;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'candidate': return 'candidates';
      case 'interview': return 'clock';
      case 'deadline': return 'alert-triangle';
      case 'strategy': return 'strategy';
      case 'opportunity': return 'lightbulb';
      case 'approval': return 'check-square';
      case 'team': return 'team';
      default: return 'bell';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'candidate': return '#06B6D4';
      case 'interview': return '#8B5CF6';
      case 'deadline': return '#EF4444';
      case 'strategy': return '#3B82F6';
      case 'opportunity': return '#10B981';
      case 'approval': return '#F59E0B';
      case 'team': return '#EC4899';
      default: return '#94A3B8';
    }
  };

  const handleNotifClick = (notif) => {
    if (notif.category === 'candidate' || notif.category === 'interview') {
      setActiveTab('candidates');
    } else if (notif.category === 'strategy' || notif.category === 'deadline') {
      setActiveTab('strategy');
    } else if (notif.category === 'opportunity') {
      setActiveTab('opportunities');
    } else if (notif.category === 'approval') {
      setActiveTab('tasks');
    } else if (notif.category === 'team') {
      setActiveTab('team');
    }
    setIsNotifOpen(false);
  };

  return (
    <div className="notif-dropdown-popover" style={{
      position: 'absolute',
      top: '64px',
      right: '20px',
      width: '360px',
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
      zIndex: 150,
      overflow: 'hidden',
      animation: 'modalSlide 0.2s ease-out'
    }}>
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="bell" size={16} color="var(--accent-cyan)" />
          <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#fff' }}>Command Notifications</span>
        </div>
        <button
          onClick={markAllNotificationsRead}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent-cyan)',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Mark all read
        </button>
      </div>

      <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => handleNotifClick(n)}
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '6px',
              backgroundColor: n.isRead ? 'transparent' : 'rgba(6, 182, 212, 0.06)',
              border: '1px solid',
              borderColor: n.isRead ? 'transparent' : 'rgba(6, 182, 212, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              gap: '12px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: `${getCategoryColor(n.category)}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon name={getCategoryIcon(n.category)} size={16} color={getCategoryColor(n.category)} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>
                {n.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                {n.message}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

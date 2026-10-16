import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, userRole } = useDashboard();

  const navItems = userRole === 'admin' ? [
    { id: 'admin-console', label: '👑 Admin Data Entry', icon: 'plus' },
    { id: 'dashboard', label: 'Mayank Dashboard', icon: 'dashboard' },
    { id: 'candidates', label: 'Candidate Pipeline', icon: 'candidates' },
    { id: 'strategy', label: 'Strategic Priorities', icon: 'strategy' },
    { id: 'research', label: 'Research Tasks', icon: 'research' },
    { id: 'tasks', label: 'Tasks Operations', icon: 'tasks' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ] : [
    { id: 'dashboard', label: 'Mayank Executive View', icon: 'dashboard' },
    { id: 'candidates', label: 'Candidate Pipeline (Live)', icon: 'candidates' },
    { id: 'strategy', label: 'Strategic Priorities (Live)', icon: 'strategy' },
    { id: 'tasks', label: 'Action Tasks', icon: 'tasks' },
    { id: 'reports', label: 'Weekly Summary', icon: 'reports' }
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-icon">BP</div>
        <div>
          <h1 className="brand-title">BytePath Academy</h1>
          <span className="brand-subtitle">Command Center</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(item.id);
              if (mobileOpen) setMobileOpen(false);
            }}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge-mini">
          <div className="user-avatar-sm">MG</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Mayank Gaur
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Head of Strategy & Talent
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

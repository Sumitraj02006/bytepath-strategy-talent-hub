import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab } = useDashboard();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'strategy', label: 'Strategy', icon: 'strategy' },
    { id: 'research', label: 'Research', icon: 'research' },
    { id: 'opportunities', label: 'Opportunities', icon: 'opportunities' },
    { id: 'talent', label: 'Talent Acquisition', icon: 'talent' },
    { id: 'candidates', label: 'Candidates', icon: 'candidates' },
    { id: 'team', label: 'Team', icon: 'team' },
    { id: 'tasks', label: 'Tasks', icon: 'tasks' },
    { id: 'reports', label: 'Reports', icon: 'reports' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
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

import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const SettingsView = () => {
  const { resetToDefaultData } = useDashboard();

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Command Center Settings</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Manage executive profile settings, notification preferences, and data synchronization.
        </p>
      </div>

      {/* Executive Profile Section */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-title" style={{ marginBottom: '16px' }}>
          <Icon name="users" size={18} color="var(--accent-cyan)" />
          <span>Executive Profile</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value="Mayank Gaur" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Role Title</label>
            <input type="text" className="form-control" value="Head of Strategy, Research & Talent Acquisition" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Organization</label>
            <input type="text" className="form-control" value="BytePath Academy" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="text" className="form-control" value="mayank.gaur@bytepath.edu" readOnly />
          </div>
        </div>
      </div>

      {/* Supabase Realtime & Live Sync Status Card */}
      <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--accent-cyan)' }}>
        <div className="card-title" style={{ marginBottom: '12px' }}>
          <Icon name="zap" size={18} color="var(--accent-cyan)" />
          <span>Supabase Realtime Admin-to-User Sync</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Free PostgreSQL database & WebSocket realtime subscriptions enable live updates between Admin and User panels.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '700', color: '#fff', fontSize: '0.85rem' }}>Realtime Connection Status</span>
            <span className="priority-badge priority-high" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
              ONLINE (Multi-Tab & WebSockets Ready)
            </span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            To link your free Supabase Cloud project, add the following to your <code>.env</code> file:
          </div>
          <pre style={{ background: '#090D16', padding: '8px 12px', borderRadius: '6px', fontSize: '0.76rem', color: 'var(--accent-cyan)', overflowX: 'auto' }}>
            VITE_SUPABASE_URL=https://your-supabase-id.supabase.co{"\n"}
            VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
          </pre>
        </div>
      </div>

      {/* Interface & Theme Configuration */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-title" style={{ marginBottom: '16px' }}>
          <Icon name="settings" size={18} color="var(--accent-purple)" />
          <span>Interface & Branding Theme</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>Background Aesthetic</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dark Navy SaaS admin color scheme (#0B0F19)</div>
            </div>
            <span className="priority-badge priority-high" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)' }}>ACTIVE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>Primary & Secondary Accents</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cyan Blue (#06B6D4) & Purple (#8B5CF6)</div>
            </div>
            <span className="priority-badge priority-high" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)' }}>ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Data Management & Reset */}
      <div className="card" style={{ borderLeft: '4px solid #EF4444' }}>
        <div className="card-title" style={{ marginBottom: '12px' }}>
          <Icon name="trash" size={18} color="#EF4444" />
          <span>Data Storage Management</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          All strategy, research, candidate, task, and opportunity data is persisted locally in your browser storage. You can restore default mock data anytime.
        </p>

        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm('Reset all command center data back to initial BytePath Academy defaults?')) {
              resetToDefaultData();
              alert('Dashboard data has been restored to default state.');
            }
          }}
        >
          <Icon name="trash" size={16} />
          <span>Reset Command Center Data to Default</span>
        </button>
      </div>
    </div>
  );
};

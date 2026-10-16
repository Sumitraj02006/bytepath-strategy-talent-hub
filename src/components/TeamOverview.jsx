import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const TeamOverview = ({ onOpenAddMember }) => {
  const { teamData } = useDashboard();

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Team & Talent Overview</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Core leadership roster, intern cohorts, volunteer network & team capacity allocation across departments.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddMember}>
          <Icon name="plus" size={16} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Top Stat Summary Grid */}
      <div className="kpi-grid" style={{ marginBottom: '28px' }}>
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Core Team Members</span>
            <div className="kpi-icon-wrapper"><Icon name="team" size={20} /></div>
          </div>
          <div className="kpi-value">{teamData.stats.coreCount}</div>
          <div className="kpi-bottom"><span className="kpi-detail">Department leads & mentors</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Interns</span>
            <div className="kpi-icon-wrapper"><Icon name="users" size={20} /></div>
          </div>
          <div className="kpi-value">{teamData.stats.internsCount}</div>
          <div className="kpi-bottom"><span className="kpi-detail">Across Tech, Content & Mktg</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Volunteers</span>
            <div className="kpi-icon-wrapper"><Icon name="user-group" size={20} /></div>
          </div>
          <div className="kpi-value">{teamData.stats.volunteersCount}</div>
          <div className="kpi-bottom"><span className="kpi-detail">Campus ambassadors</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Open Roles</span>
            <div className="kpi-icon-wrapper"><Icon name="briefcase" size={20} /></div>
          </div>
          <div className="kpi-value">{teamData.stats.openRoles}</div>
          <div className="kpi-bottom"><span className="trend-badge negative">Immediate Hire Needed: 3</span></div>
        </div>
      </div>

      {/* Team Capacity Visualization (Current vs Required Capacity) */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              <Icon name="zap" size={18} color="var(--accent-cyan)" />
              <span>Team Capacity Allocation (Current vs Required)</span>
            </div>
            <div className="card-subtitle">Workforce availability percentage vs target departmental capacity</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {teamData.capacity.map(c => {
            const isHighDeficit = c.current <= 60;
            return (
              <div key={c.department} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>{c.department}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.82rem', color: isHighDeficit ? '#EF4444' : 'var(--accent-cyan)', fontWeight: '700' }}>
                      Current: {c.current}% / Target: {c.required}%
                    </span>
                    <span className={`priority-badge ${isHighDeficit ? 'priority-high' : 'priority-medium'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
                <div className="progress-track" style={{ height: '10px' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${c.current}%`,
                      background: isHighDeficit
                        ? 'linear-gradient(90deg, #EF4444, #F59E0B)'
                        : 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Team Roster */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Icon name="team" size={18} color="var(--accent-purple)" />
              <span>Core Team Leadership Roster</span>
            </div>
            <div className="card-subtitle">BytePath Academy executive team members and leaders</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {teamData.coreMembers.map(member => (
            <div key={member.id} style={{ padding: '16px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="user-avatar-sm" style={{ width: '44px', height: '44px', fontSize: '1rem', flexShrink: 0 }}>
                {member.avatar}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.92rem' }}>{member.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>{member.role}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{member.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

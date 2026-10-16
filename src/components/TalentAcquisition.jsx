import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const TalentAcquisition = ({ onOpenAddPosition }) => {
  const { funnelData, positionsList, setActiveTab } = useDashboard();
  const [posStatusFilter, setPosStatusFilter] = useState('All');

  const filteredPositions = positionsList.filter(p => {
    return posStatusFilter === 'All' || p.status === posStatusFilter;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Talent Acquisition Command Center</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Full hiring funnel analytics, conversion tracking & open position management for BytePath Academy.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('candidates')}>
            <Icon name="users" size={16} />
            <span>Manage Candidates</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenAddPosition}>
            <Icon name="plus" size={16} />
            <span>Post Open Position</span>
          </button>
        </div>
      </div>

      {/* Visual Recruitment Funnel & Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Visual Funnel Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Icon name="talent" size={18} color="var(--accent-cyan)" />
                <span>Visual Recruitment Funnel</span>
              </div>
              <div className="card-subtitle">Stage-by-stage candidate throughput & conversion rates</div>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: '700' }}>Overall Conversion: 4.2%</span>
          </div>

          <div className="funnel-container">
            {funnelData.stages.map((stage, idx) => (
              <div key={stage.name} className="funnel-stage-row">
                <div className="funnel-stage-name">{stage.name}</div>
                <div className="funnel-bar-wrapper">
                  <div
                    className="funnel-bar-fill"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: stage.color,
                      boxShadow: `0 0 12px ${stage.color}66`
                    }}
                  >
                    <span>{stage.count}</span>
                  </div>
                </div>
                <div className="funnel-stage-stat">
                  <span style={{ fontWeight: '700', color: '#fff' }}>{stage.percentage}%</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                    {idx === 0 ? 'top funnel' : `from previous`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Metrics Summary Grid */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="card-header">
            <div>
              <div className="card-title">
                <Icon name="dashboard" size={18} color="var(--accent-purple)" />
                <span>Funnel Breakdown Metrics</span>
              </div>
              <div className="card-subtitle">Real-time candidate metrics across all hiring pipelines</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Applications</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>{funnelData.stats.totalApplications}</div>
            </div>

            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Shortlisted Candidates</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{funnelData.stats.shortlisted}</div>
            </div>

            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Interviews Scheduled</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-purple)' }}>{funnelData.stats.interviewsScheduled}</div>
            </div>

            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Selected Candidates</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#EC4899' }}>{funnelData.stats.selected}</div>
            </div>

            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Joined Interns/Staff</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10B981' }}>{funnelData.stats.joined}</div>
            </div>

            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pending Decisions</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#F59E0B' }}>{funnelData.stats.pendingDecisions}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Application Trend Visualizer */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              <Icon name="trending-up" size={18} color="var(--accent-cyan)" />
              <span>Application Velocity Trend (Last 6 Months)</span>
            </div>
            <div className="card-subtitle">Monthly volume of incoming candidate submissions</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '180px', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
          {funnelData.trends.map(t => {
            const maxVal = 260;
            const barHeight = (t.applications / maxVal) * 140;
            return (
              <div key={t.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>{t.applications}</div>
                <div style={{ width: '100%', maxWidth: '44px', height: `${barHeight}px`, background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-blue))', borderRadius: '6px 6px 0 0' }}></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{t.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Open Positions Table */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff' }}>Open Positions Performance</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Filter Status:</span>
          <select
            className="form-control"
            value={posStatusFilter}
            onChange={(e) => setPosStatusFilter(e.target.value)}
            style={{ width: '140px', padding: '4px 10px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Review">In Review</option>
            <option value="Filled">Filled</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Position Title</th>
                <th>Department</th>
                <th>Applications</th>
                <th>Shortlisted</th>
                <th>Interviews</th>
                <th>Selected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map(pos => (
                <tr key={pos.id}>
                  <td style={{ fontWeight: '700', color: '#fff' }}>{pos.title}</td>
                  <td><span className="skill-tag">{pos.department}</span></td>
                  <td style={{ fontWeight: '700', color: '#fff' }}>{pos.applications}</td>
                  <td style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>{pos.shortlisted}</td>
                  <td style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>{pos.interviews}</td>
                  <td style={{ color: '#10B981', fontWeight: '700' }}>{pos.selected}</td>
                  <td>
                    <span className={`status-badge badge-${pos.status.toLowerCase().replace(/ /g, '-')}`}>
                      <span className="status-dot"></span>
                      {pos.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

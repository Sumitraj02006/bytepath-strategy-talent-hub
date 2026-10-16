import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const ExecutiveOverview = () => {
  const {
    kpis,
    strategyList,
    candidatesList,
    syncLogs,
    activeAnnouncement,
    setActiveTab,
    socketConnected,
    userRole,
    setUserRole
  } = useDashboard();

  const safeStrategy = Array.isArray(strategyList) ? strategyList : [];
  const safeCandidates = Array.isArray(candidatesList) ? candidatesList : [];
  const safeKpis = Array.isArray(kpis) ? kpis : [];

  const getKpiIcon = (label) => {
    switch (label) {
      case 'Active Projects': return 'strategy';
      case 'Open Opportunities': return 'lightbulb';
      case 'Research Tasks': return 'microscope';
      case 'Open Positions': return 'briefcase';
      case 'Candidates in Pipeline': return 'users';
      case 'Pending Decisions': return 'check-square';
      default: return 'dashboard';
    }
  };

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* 1. Header & Live Status */}
      <div style={{
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '20px 24px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
              Mayank Gaur — Executive Command Center
            </h2>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: socketConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: socketConnected ? '#10B981' : '#EF4444',
              border: `1px solid ${socketConnected ? '#10B981' : '#EF4444'}`
            }}>
              {socketConnected ? '🟢 Live Socket Stream Connected' : '🔴 Server Offline'}
            </span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: 0 }}>
            Showing <strong>important real-time updates</strong> streamed directly from the Admin Panel. Any action submitted in Admin panel reflects here immediately.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => {
              setUserRole('admin');
              setActiveTab('admin-console');
            }}
            className="btn btn-secondary"
            style={{
              borderColor: '#06B6D4',
              color: '#06B6D4',
              background: 'rgba(6, 182, 212, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>👑</span> Open Admin Data Entry
          </button>
        </div>
      </div>

      {/* 2. Top Urgent Announcement Alert (If broadcasted by Admin) */}
      {activeAnnouncement && (
        <div style={{
          marginBottom: '24px',
          background: activeAnnouncement.priority === 'urgent'
            ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.1))'
            : 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.1))',
          border: `1px solid ${activeAnnouncement.priority === 'urgent' ? '#EF4444' : '#3B82F6'}`,
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          animation: 'pulse 2s infinite'
        }}>
          <span style={{ fontSize: '1.6rem' }}>📢</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{activeAnnouncement.title}</strong>
              <span style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: activeAnnouncement.priority === 'urgent' ? '#DC2626' : '#2563EB',
                color: '#fff',
                fontWeight: '700'
              }}>
                FLASH ALERT
              </span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginTop: '4px' }}>
              {activeAnnouncement.message}
            </div>
          </div>
        </div>
      )}

      {/* 3. Important KPI Cards Grid (Numbers update live via Socket.io) */}
      <div className="kpi-grid" style={{ marginBottom: '28px' }}>
        {safeKpis.map((kpi) => (
          <div key={kpi.id} className="kpi-card" style={{ transition: 'all 0.3s' }}>
            <div className="kpi-top">
              <span className="kpi-label">{kpi.label}</span>
              <div className="kpi-icon-wrapper">
                <Icon name={getKpiIcon(kpi.label)} size={20} />
              </div>
            </div>
            <div className="kpi-value" style={{ color: '#F8FAFC' }}>{kpi.value}</div>
            <div className="kpi-bottom">
              <span className={`trend-badge ${kpi.isPositive ? 'positive' : 'negative'}`}>
                <Icon name={kpi.isPositive ? 'trending-up' : 'trending-down'} size={12} />
                {kpi.trend}
              </span>
              <span className="kpi-detail">{kpi.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Two Main Focused Columns: Important Priorities & Candidate Hiring Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '24px',
        marginBottom: '28px'
      }}>
        {/* COLUMN A: Important Strategic Priorities */}
        <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="strategy" size={20} color="var(--accent-cyan)" />
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                  Important Strategic Priorities
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Roadmap items pushed from Admin ({safeStrategy.length} Active)
                </span>
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#06B6D4', fontWeight: '700' }}>⚡ Live Synced</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {safeStrategy.slice(0, 4).map(item => (
              <div
                key={item.id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#fff' }}>{item.name}</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span className={`priority-badge priority-${(item.priority || 'high').toLowerCase()}`}>
                      {item.priority || 'High'}
                    </span>
                    <span className={`status-badge badge-${(item.status || 'in-progress').toLowerCase().replace(/ /g, '-')}`}>
                      <span className="status-dot"></span>
                      {item.status || 'In Progress'}
                    </span>
                  </div>
                </div>

                <div className="progress-container" style={{ margin: '8px 0' }}>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <span className="progress-text" style={{ fontSize: '0.75rem' }}>{item.progress}%</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong style={{ color: 'var(--accent-cyan)' }}>Next:</strong> {item.nextAction}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.deadline}</span>
                </div>
              </div>
            ))}

            {safeStrategy.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No strategic priorities entered yet. Add from Admin Data Entry!
              </div>
            )}
          </div>
        </div>

        {/* COLUMN B: Important Candidate Hiring Decisions */}
        <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="users" size={20} color="#10B981" />
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                  Key Candidate Hiring Highlights
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Talent updates pushed from Admin ({safeCandidates.length} Candidates)
                </span>
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '700' }}>⚡ Live Synced</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {safeCandidates.slice(0, 4).map(cand => (
              <div
                key={cand.id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#fff' }}>{cand.name}</span>
                    <span className={`status-badge badge-${(cand.stage || 'Applied').toLowerCase().replace(/ /g, '-')}`}>
                      <span className="status-dot"></span>
                      {cand.stage}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '2px', fontWeight: '600' }}>
                    {cand.position} <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>• {cand.college}</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Next: {cand.nextAction}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--accent-purple)' }}>
                    {cand.interviewScore}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Score</span>
                </div>
              </div>
            ))}

            {safeCandidates.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No candidates in pipeline. Push one from Admin Data Entry!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Live Activity Stream (Shows what Admin just submitted in real-time) */}
      <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.3rem' }}>⚡</span>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', margin: 0 }}>
                Live Stream from Admin Console
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Incoming Socket.io event stream updating this dashboard in real time
              </span>
            </div>
          </div>
          <span style={{
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            color: '#06B6D4',
            fontWeight: '600'
          }}>
            Realtime WebSocket
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(Array.isArray(syncLogs) && syncLogs.length > 0 ? syncLogs : [
            { id: 'def-1', text: 'Mayank Dashboard connected. Waiting for Admin updates...', time: 'Just now' }
          ]).slice(0, 5).map((log, idx) => (
            <div
              key={log.id || idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.84rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 6px #10B981'
                }} />
                <span style={{ color: '#F8FAFC' }}>{log.text || log.message}</span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

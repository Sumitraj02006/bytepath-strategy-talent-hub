import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const AdminConsole = () => {
  const {
    addCandidate,
    addStrategyItem,
    kpis,
    updateKpis,
    sendLiveAnnouncement,
    clearLiveAnnouncement,
    activeAnnouncement,
    syncLogs,
    setUserRole,
    socketConnected,
    presenceStats
  } = useDashboard();

  // Candidate Form State
  const [candName, setCandName] = useState('');
  const [candPosition, setCandPosition] = useState('AI Research Intern');
  const [candCollege, setCandCollege] = useState('');
  const [candStage, setCandStage] = useState('Selected');
  const [candScore, setCandScore] = useState('9.0 / 10');
  const [candSuccess, setCandSuccess] = useState(false);

  // Strategy Form State
  const [stratName, setStratName] = useState('');
  const [stratPriority, setStratPriority] = useState('High');
  const [stratStatus, setStratStatus] = useState('In Progress');
  const [stratProgress, setStratProgress] = useState(65);
  const [stratNextAction, setStratNextAction] = useState('');
  const [stratSuccess, setStratSuccess] = useState(false);

  // KPI Quick Editor State
  const [kpiValues, setKpiValues] = useState(() => {
    const map = {};
    (Array.isArray(kpis) ? kpis : []).forEach(k => {
      map[k.id] = k.value;
    });
    return map;
  });
  const [kpiSuccess, setKpiSuccess] = useState(false);

  // Broadcast Form State
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertPriority, setAlertPriority] = useState('urgent');
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Handle Candidate Submit
  const handleCandidateSubmit = (e) => {
    e.preventDefault();
    if (!candName.trim()) return;

    addCandidate({
      name: candName.trim(),
      position: candPosition,
      college: candCollege.trim() || 'Tier-1 Engineering College',
      stage: candStage,
      interviewDate: new Date().toLocaleDateString(),
      interviewScore: candScore,
      skills: ['AI/ML', 'Problem Solving', 'Leadership'],
      recommendation: `Recommended for ${candStage} stage by Admin.`,
      decision: candStage === 'Selected' ? 'Selected' : 'Pending',
      nextAction: candStage === 'Selected' ? 'Issue formal offer letter' : 'Schedule technical review',
      appliedDate: new Date().toISOString().split('T')[0],
      email: `${candName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: '+91 98765 43210'
    });

    setCandName('');
    setCandCollege('');
    setCandSuccess(true);
    setTimeout(() => setCandSuccess(false), 3000);
  };

  // Handle Strategy Submit
  const handleStrategySubmit = (e) => {
    e.preventDefault();
    if (!stratName.trim()) return;

    addStrategyItem({
      name: stratName.trim(),
      description: `Executive strategic priority initiated from Admin console for BytePath Academy.`,
      status: stratStatus,
      priority: stratPriority,
      owner: 'Mayank Gaur',
      deadline: '2026-11-15',
      progress: Number(stratProgress),
      nextAction: stratNextAction.trim() || 'Execute first phase rollout & review progress.'
    });

    setStratName('');
    setStratNextAction('');
    setStratSuccess(true);
    setTimeout(() => setStratSuccess(false), 3000);
  };

  // Handle KPI Update Submit
  const handleKpiSubmit = (e) => {
    e.preventDefault();
    const updated = (Array.isArray(kpis) ? kpis : []).map(k => ({
      ...k,
      value: kpiValues[k.id] !== undefined ? Number(kpiValues[k.id]) : k.value
    }));

    if (updateKpis) {
      updateKpis(updated);
    }
    setKpiSuccess(true);
    setTimeout(() => setKpiSuccess(false), 3000);
  };

  // Handle Broadcast Alert Submit
  const handleAlertSubmit = (e) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertMessage.trim()) return;

    sendLiveAnnouncement(alertTitle.trim(), alertMessage.trim(), alertPriority);
    setAlertTitle('');
    setAlertMessage('');
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 3000);
  };

  const handleOpenUserWindow = () => {
    const userUrl = `${window.location.origin}${window.location.pathname}?role=user`;
    window.open(userUrl, '_blank', 'width=1200,height=800');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Admin Console Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.08))',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.5rem' }}>👑</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: 0 }}>
              Admin Real-Time Data Entry Center
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
              {socketConnected ? '🟢 Socket.io Live Sync Active' : '🔴 Server Connecting...'}
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '720px' }}>
            Direct data entry console. Whatever you submit here will <strong>instantly stream to Mayank's Dashboard panel</strong> in real time without refreshing!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => setUserRole('user')}
            className="btn btn-secondary"
            style={{
              borderColor: '#10B981',
              color: '#34D399',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>👁️</span> Switch to Mayank Dashboard
          </button>

          <button
            onClick={handleOpenUserWindow}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Open Mayank Dashboard in a separate tab to watch real-time updates!"
          >
            <span>🔗</span> Open Mayank's Screen in New Tab
          </button>
        </div>
      </div>

      {/* Grid of Clean Input Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* CARD 1: Push Candidate */}
        <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>👤</span>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Push Candidate to Mayank
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Streams directly to Hiring Pipeline</span>
              </div>
            </div>
            {candSuccess && (
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>✓ Streamed Live!</span>
            )}
          </div>

          <form onSubmit={handleCandidateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="form-label">Candidate Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Aarav Sharma"
                value={candName}
                onChange={(e) => setCandName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Role / Position</label>
                <select
                  className="form-control"
                  value={candPosition}
                  onChange={(e) => setCandPosition(e.target.value)}
                >
                  <option value="AI Research Intern">AI Research Intern</option>
                  <option value="Web Development Intern">Web Dev Intern</option>
                  <option value="Growth Marketing Manager">Growth Marketing</option>
                  <option value="Curriculum Strategist">Curriculum Strategist</option>
                  <option value="Graphic Design Intern">Design Intern</option>
                </select>
              </div>

              <div>
                <label className="form-label">Hiring Stage</label>
                <select
                  className="form-control"
                  value={candStage}
                  onChange={(e) => setCandStage(e.target.value)}
                >
                  <option value="Selected">Selected (Hire)</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Applied">Applied (New)</option>
                  <option value="Joined">Joined Team</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">College / Institute</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. IIT Delhi"
                  value={candCollege}
                  onChange={(e) => setCandCollege(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Evaluation Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 9.2 / 10"
                  value={candScore}
                  onChange={(e) => setCandScore(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '6px', justifyContent: 'center' }}
            >
              <span>🚀</span> Push Candidate to Mayank's Dashboard
            </button>
          </form>
        </div>

        {/* CARD 2: Push Strategic Priority */}
        <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>🎯</span>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Push Strategic Priority
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Streams to Executive Roadmap</span>
              </div>
            </div>
            {stratSuccess && (
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>✓ Streamed Live!</span>
            )}
          </div>

          <form onSubmit={handleStrategySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="form-label">Initiative Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. MoU with Top 15 Engineering Colleges"
                value={stratName}
                onChange={(e) => setStratName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">Priority Level</label>
                <select
                  className="form-control"
                  value={stratPriority}
                  onChange={(e) => setStratPriority(e.target.value)}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={stratStatus}
                  onChange={(e) => setStratStatus(e.target.value)}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Not Started">Not Started</option>
                </select>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label className="form-label" style={{ margin: 0 }}>Progress: {stratProgress}%</label>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={stratProgress}
                onChange={(e) => setStratProgress(e.target.value)}
                style={{ width: '100%', accentColor: '#06B6D4' }}
              />
            </div>

            <div>
              <label className="form-label">Next Action Step</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Finalize draft MOU agreements"
                value={stratNextAction}
                onChange={(e) => setStratNextAction(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                marginTop: '6px',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
              }}
            >
              <span>📌</span> Push Priority to Mayank's Dashboard
            </button>
          </form>
        </div>

        {/* CARD 3: Update KPI Numbers */}
        <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>📊</span>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Update Mayank's Live KPIs
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Changes the top metric cards</span>
              </div>
            </div>
            {kpiSuccess && (
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>✓ KPIs Updated!</span>
            )}
          </div>

          <form onSubmit={handleKpiSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {(Array.isArray(kpis) ? kpis : []).map(k => (
                <div key={k.id}>
                  <label className="form-label" style={{ fontSize: '0.76rem' }}>{k.label}</label>
                  <input
                    type="number"
                    className="form-control"
                    value={kpiValues[k.id] ?? k.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKpiValues(prev => ({ ...prev, [k.id]: val }));
                    }}
                    style={{ fontWeight: '700', color: '#06B6D4' }}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="btn btn-secondary"
              style={{
                marginTop: '12px',
                justifyContent: 'center',
                borderColor: '#06B6D4',
                color: '#06B6D4',
                background: 'rgba(6, 182, 212, 0.08)'
              }}
            >
              <span>⚡</span> Update Mayank's Dashboard Numbers
            </button>
          </form>
        </div>

        {/* CARD 4: Flash Announcement Alert */}
        <div className="card" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>📢</span>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Flash Broadcast Announcement
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Appears at top of Mayank's screen</span>
              </div>
            </div>
            {alertSuccess && (
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>✓ Flashed!</span>
            )}
          </div>

          <form onSubmit={handleAlertSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="form-label">Alert Headline *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Critical Campus Placement Drive Approved"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Message Content *</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Type the message to flash on Mayank's screen..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className={`tab-pill ${alertPriority === 'high' ? 'active' : ''}`}
                onClick={() => setAlertPriority('high')}
                style={{ flex: 1, textAlign: 'center', padding: '6px' }}
              >
                ⚡ High (Blue)
              </button>
              <button
                type="button"
                className={`tab-pill ${alertPriority === 'urgent' ? 'active' : ''}`}
                onClick={() => setAlertPriority('urgent')}
                style={{ flex: 1, textAlign: 'center', padding: '6px', borderColor: alertPriority === 'urgent' ? '#EF4444' : '' }}
              >
                🚨 Urgent (Red)
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: alertPriority === 'urgent'
                    ? 'linear-gradient(135deg, #DC2626, #EF4444)'
                    : 'linear-gradient(135deg, #2563EB, #7C3AED)'
                }}
              >
                <span>🚀</span> Send Alert
              </button>

              {activeAnnouncement && (
                <button
                  type="button"
                  onClick={clearLiveAnnouncement}
                  className="btn btn-secondary"
                  style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                  title="Clear active announcement banner"
                >
                  Clear Active
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Real-time Activity Stream & Audit Log */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                Live Socket.io Outgoing Stream
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Audit trail of changes transmitted to Mayank's Dashboard
              </span>
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Active Viewers: <strong>{presenceStats.users}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(Array.isArray(syncLogs) && syncLogs.length > 0 ? syncLogs : [
            { id: 'def-1', text: 'Admin Console initialized. Ready to stream data to Mayank.', time: 'Just now', type: 'INIT' }
          ]).map((log, idx) => (
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
                  backgroundColor: '#06B6D4'
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

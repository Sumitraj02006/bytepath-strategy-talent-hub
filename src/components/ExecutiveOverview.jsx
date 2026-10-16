import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const ExecutiveOverview = () => {
  const { kpis, strategyList, opportunitiesList, candidatesList, tasksList, setActiveTab, setSelectedCandidate } = useDashboard();

  const safeStrategy = Array.isArray(strategyList) ? strategyList : [];
  const safeCandidates = Array.isArray(candidatesList) ? candidatesList : [];
  const safeTasks = Array.isArray(tasksList) ? tasksList : [];
  const safeOpps = Array.isArray(opportunitiesList) ? opportunitiesList : [];
  const safeKpis = Array.isArray(kpis) ? kpis : [];

  const highPriorityStrategy = safeStrategy.filter(s => s && s.priority === 'High');
  const delayedItems = safeStrategy.filter(s => s && s.status === 'Delayed');
  const pendingCandidates = safeCandidates.filter(c => c && (c.decision === 'Pending' || c.stage === 'Interviewed'));
  const overdueTasks = safeTasks.filter(t => t && t.tabGroup === 'Overdue');
  const highPotentialOpps = safeOpps.filter(o => o && o.isHighPotential);

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
    <div>
      {/* Page Title & Context Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
            Executive Command Overview
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Real-time status of BytePath Academy's strategy initiatives, research pipeline & talent incubator.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('reports')}>
            <Icon name="reports" size={16} />
            <span>Weekly Summary Report</span>
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('strategy')}>
            <Icon name="plus" size={16} />
            <span>New Strategy Initiative</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        {safeKpis.map((kpi) => (
          <div key={kpi.id} className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">{kpi.label}</span>
              <div className="kpi-icon-wrapper">
                <Icon name={getKpiIcon(kpi.label)} size={20} />
              </div>
            </div>
            <div className="kpi-value">{kpi.value}</div>
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

      {/* Attention / Action Banner (Answers UX principles: What is stuck? What needs attention?) */}
      <div className="attention-banner">
        <div className="banner-content">
          <div className="banner-icon">
            <Icon name="alert-triangle" size={22} />
          </div>
          <div>
            <div className="banner-title">
              Attention Required: {delayedItems.length} Delayed Initiative & {pendingCandidates.length} Pending Hiring Decisions
            </div>
            <div className="banner-text">
              "Industry Collaboration Hub" has missed its milestone deadline. 3 top candidate offer letters require Mayank's final approval.
            </div>
          </div>
        </div>
        <button className="btn btn-secondary" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.4)' }} onClick={() => setActiveTab('candidates')}>
          <span>Review Decisions</span>
          <Icon name="arrow-right" size={14} />
        </button>
      </div>

      {/* Grid of Key Command Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* High Priority Strategic Priorities */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Icon name="strategy" size={18} color="var(--accent-cyan)" />
                <span>High-Priority Strategy Items</span>
              </div>
              <div className="card-subtitle">Active initiatives requiring Mayank's direction</div>
            </div>
            <button className="btn btn-secondary btn-icon-only" onClick={() => setActiveTab('strategy')}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {highPriorityStrategy.slice(0, 3).map(item => (
              <div key={item.id} style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff' }}>{item.name}</span>
                  <span className={`status-badge badge-${(item.status || 'in-progress').toLowerCase().replace(/ /g, '-')}`}>
                    <span className="status-dot"></span>
                    {item.status || 'In Progress'}
                  </span>
                </div>
                <div className="progress-container" style={{ margin: '8px 0' }}>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{item.progress}%</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Next:</strong> {item.nextAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Potential Opportunities */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Icon name="lightbulb" size={18} color="var(--accent-purple)" />
                <span>High-Potential Opportunities</span>
              </div>
              <div className="card-subtitle">Strategic growth catalysts with highest ROI</div>
            </div>
            <button className="btn btn-secondary btn-icon-only" onClick={() => setActiveTab('opportunities')}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {highPotentialOpps.slice(0, 3).map(opp => (
              <div key={opp.id} style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.88rem', color: '#fff' }}>{opp.name}</span>
                  <span className="priority-badge priority-high">HIGH POTENTIAL</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Category: {opp.category}</div>
                <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: '600' }}>
                  Impact: {opp.estimatedImpact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Hiring Candidates */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Icon name="user-check" size={18} color="#10B981" />
                <span>Candidate Decisions Pending</span>
              </div>
              <div className="card-subtitle">Shortlisted & interviewed talent ready for hire decision</div>
            </div>
            <button className="btn btn-secondary btn-icon-only" onClick={() => setActiveTab('candidates')}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {candidatesList.slice(0, 3).map(cand => (
              <div
                key={cand.id}
                onClick={() => { setSelectedCandidate(cand); setActiveTab('candidates'); }}
                style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.88rem', color: '#fff' }}>{cand.name}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '700' }}>Score: {cand.interviewScore}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Role: {cand.position}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next Action: {cand.nextAction}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

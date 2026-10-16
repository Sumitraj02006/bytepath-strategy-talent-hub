import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const GlobalSearchModal = () => {
  const {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    candidatesList,
    strategyList,
    opportunitiesList,
    researchList,
    tasksList,
    setActiveTab,
    setSelectedCandidate
  } = useDashboard();

  if (!isSearchOpen) return null;

  const query = (searchQuery || '').toLowerCase().trim();

  const safeCandidates = Array.isArray(candidatesList) ? candidatesList : [];
  const safeStrategy = Array.isArray(strategyList) ? strategyList : [];
  const safeOpps = Array.isArray(opportunitiesList) ? opportunitiesList : [];
  const safeResearch = Array.isArray(researchList) ? researchList : [];
  const safeTasks = Array.isArray(tasksList) ? tasksList : [];

  const matchedCandidates = query
    ? safeCandidates.filter(c => c && (
        (c.name || '').toLowerCase().includes(query) ||
        (c.position || '').toLowerCase().includes(query) ||
        (Array.isArray(c.skills) && c.skills.some(s => typeof s === 'string' && s.toLowerCase().includes(query)))
      ))
    : safeCandidates.slice(0, 3);

  const matchedStrategy = query
    ? safeStrategy.filter(s => s && (
        (s.name || '').toLowerCase().includes(query) ||
        (s.description || '').toLowerCase().includes(query)
      ))
    : safeStrategy.slice(0, 3);

  const matchedOpps = query
    ? safeOpps.filter(o => o && (
        (o.name || '').toLowerCase().includes(query) ||
        (o.category || '').toLowerCase().includes(query)
      ))
    : safeOpps.slice(0, 3);

  const matchedResearch = query
    ? safeResearch.filter(r => r && (
        (r.name || '').toLowerCase().includes(query) ||
        (r.category || '').toLowerCase().includes(query)
      ))
    : safeResearch.slice(0, 3);

  const matchedTasks = query
    ? safeTasks.filter(t => t && (
        (t.task || '').toLowerCase().includes(query) ||
        (t.assigned || '').toLowerCase().includes(query)
      ))
    : safeTasks.slice(0, 3);

  const handleSelectCandidate = (cand) => {
    setSelectedCandidate(cand);
    setActiveTab('candidates');
    setIsSearchOpen(false);
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Icon name="search" size={20} color="var(--accent-cyan)" />
          <input
            type="text"
            placeholder="Search candidates, strategy priorities, research, opportunities, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '480px', overflowY: 'auto' }}>
          {/* Candidates */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Candidates ({matchedCandidates.length})
            </div>
            {matchedCandidates.map(c => (
              <div
                key={c.id}
                onClick={() => handleSelectCandidate(c)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', color: '#fff' }}>{c.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '10px' }}>{c.position}</span>
                </div>
                <span className={`status-badge badge-${c.stage.toLowerCase().replace(/ /g, '-')}`}>
                  {c.stage}
                </span>
              </div>
            ))}
          </div>

          {/* Strategy */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Strategy Initiatives ({matchedStrategy.length})
            </div>
            {matchedStrategy.map(s => (
              <div
                key={s.id}
                onClick={() => handleNavigate('strategy')}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', color: '#fff' }}>{s.name}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Owner: {s.owner}</span>
                </div>
                <span className={`status-badge badge-${s.status.toLowerCase().replace(/ /g, '-')}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>

          {/* Opportunities */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Strategic Opportunities ({matchedOpps.length})
            </div>
            {matchedOpps.map(o => (
              <div
                key={o.id}
                onClick={() => handleNavigate('opportunities')}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', color: '#fff' }}>{o.name}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginLeft: '10px' }}>{o.category}</span>
                </div>
                <span className={`priority-badge priority-${o.priority.toLowerCase()}`}>
                  {o.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

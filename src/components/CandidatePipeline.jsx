import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const CandidatePipeline = ({ onOpenAddModal, onEditCandidate }) => {
  const { candidatesList, selectedCandidate, setSelectedCandidate, updateCandidateStage, deleteCandidate, userRole } = useDashboard();
  const [stageFilter, setStageFilter] = useState('All');
  const [positionFilter, setPositionFilter] = useState('All');

  const safeList = Array.isArray(candidatesList) ? candidatesList : [];

  const stages = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Interviewed', 'Selected', 'Rejected', 'Joined'];
  const positions = Array.from(new Set(safeList.map(c => c?.position).filter(Boolean)));

  const filteredCandidates = safeList.filter(c => {
    if (!c) return false;
    const matchStage = stageFilter === 'All' || c.stage === stageFilter;
    const matchPos = positionFilter === 'All' || c.position === positionFilter;
    return matchStage && matchPos;
  });

  return (
    <div>
      {/* Role Notice Banner */}
      <div style={{
        backgroundColor: userRole === 'admin' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(16, 185, 129, 0.08)',
        border: `1px solid ${userRole === 'admin' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.2rem' }}>{userRole === 'admin' ? '👑' : '👁️'}</span>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: userRole === 'admin' ? '#60A5FA' : '#34D399' }}>
              {userRole === 'admin' ? 'Admin Panel Active (Live Broadcaster)' : 'User / Viewer Panel Active (Live Receiver)'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {userRole === 'admin'
                ? 'Any candidate stage transition, edit or addition you make broadcasts live to all connected users via Socket.io!'
                : 'You have read-only view. Watch candidate stages change in real-time as Admin updates them on their screen.'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: 'var(--text-muted)'
          }}>
            ⚡ Socket.io Event: UPDATE_CANDIDATE_STAGE
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Candidate Management Pipeline</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Detailed profiles, skill evaluations, interview scoring, and stage transitions for active candidates.
          </p>
        </div>
        {userRole === 'admin' ? (
          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <Icon name="plus" size={16} />
            <span>Add Candidate</span>
          </button>
        ) : (
          <div style={{
            padding: '6px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10B981',
            fontSize: '0.82rem',
            fontWeight: '600'
          }}>
            👁️ Live Viewer Mode (Admin Only Adds)
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="filters-row card" style={{ padding: '16px 20px' }}>
        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Stage:</span>
          <select
            className="form-control"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            style={{ width: '180px', padding: '6px 12px' }}
          >
            <option value="All">All Stages</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Position:</span>
          <select
            className="form-control"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            style={{ width: '220px', padding: '6px 12px' }}
          >
            <option value="All">All Positions</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Position Applied</th>
                <th>App Date</th>
                <th>Current Stage</th>
                <th>Interview Date</th>
                <th>Score</th>
                <th>Top Skills</th>
                <th>Recommendation</th>
                <th>Decision</th>
                <th>Next Action</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(cand => (
                <tr key={cand.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedCandidate(cand)}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>{cand.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cand.college}</div>
                  </td>
                  <td style={{ fontSize: '0.84rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                    {cand.position}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {cand.appliedDate}
                  </td>
                  <td>
                    <span className={`status-badge badge-${(cand.stage || 'Applied').toLowerCase().replace(/ /g, '-')}`}>
                      <span className="status-dot"></span>
                      {cand.stage || 'Applied'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {cand.interviewDate}
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--accent-purple)', fontSize: '0.88rem' }}>
                    {cand.interviewScore}
                  </td>
                  <td style={{ maxWidth: '180px' }}>
                    {cand.skills.slice(0, 3).map(sk => (
                      <span key={sk} className="skill-tag">{sk}</span>
                    ))}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '180px' }}>
                    {cand.recommendation}
                  </td>
                  <td>
                    <span className={`priority-badge priority-${cand.decision === 'Selected' || cand.decision === 'Joined' ? 'low' : (cand.decision === 'Pending' ? 'medium' : 'high')}`}>
                      {cand.decision}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', maxWidth: '160px' }}>
                    {cand.nextAction}
                  </td>
                  <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        className="btn btn-secondary btn-icon-only"
                        title="View Profile"
                        onClick={() => setSelectedCandidate(cand)}
                      >
                        <Icon name="eye" size={14} />
                      </button>
                      {userRole === 'admin' && (
                        <button
                          className="btn btn-danger btn-icon-only"
                          title="Delete Candidate (Admin)"
                          onClick={() => deleteCandidate(cand.id)}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No candidates match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Candidate Modal */}
      {selectedCandidate && (
        <div className="modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{selectedCandidate.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>{selectedCandidate.position} — {selectedCandidate.college}</p>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setSelectedCandidate(null)}>
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Contact info & Stage switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</div>
                  <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600' }}>{selectedCandidate.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</div>
                  <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600' }}>{selectedCandidate.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Application Date</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedCandidate.appliedDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interview Score</div>
                  <div style={{ fontSize: '1rem', color: 'var(--accent-purple)', fontWeight: '800' }}>{selectedCandidate.interviewScore}</div>
                </div>
              </div>

              {/* Stage Transition Selector */}
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Candidate Hiring Stage:</label>
                  <span style={{ fontSize: '0.75rem', color: userRole === 'admin' ? '#06B6D4' : '#10B981', fontWeight: '600' }}>
                    {userRole === 'admin' ? '⚡ Broadcasts live to User Panel on change' : '🔒 Read-only view (Controlled by Admin)'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {stages.map(st => (
                    <button
                      key={st}
                      disabled={userRole !== 'admin'}
                      className={`tab-pill ${selectedCandidate.stage === st ? 'active' : ''}`}
                      onClick={() => {
                        if (userRole === 'admin') {
                          updateCandidateStage(selectedCandidate.id, st);
                        }
                      }}
                      style={{
                        cursor: userRole === 'admin' ? 'pointer' : 'default',
                        opacity: userRole !== 'admin' && selectedCandidate.stage !== st ? 0.45 : 1
                      }}
                      title={userRole === 'admin' ? `Move to ${st} and broadcast live` : 'Admin only'}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="form-group">
                <label className="form-label">Technical & Core Skills:</label>
                <div>
                  {selectedCandidate.skills.map(sk => (
                    <span key={sk} className="skill-tag" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>{sk}</span>
                  ))}
                </div>
              </div>

              {/* Recommendation & Next Action */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>Recommendation</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '4px' }}>{selectedCandidate.recommendation}</div>
                </div>

                <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-purple)' }}>Next Required Action</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '4px' }}>{selectedCandidate.nextAction}</div>
                </div>
              </div>

              {/* Notes */}
              {selectedCandidate.notes && (
                <div className="form-group">
                  <label className="form-label">Interviewer Notes:</label>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                    "{selectedCandidate.notes}"
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedCandidate(null)}>Close</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  updateCandidateStage(selectedCandidate.id, 'Selected', 'Selected');
                  setSelectedCandidate(null);
                }}
              >
                <Icon name="check" size={16} />
                <span>Approve & Select Candidate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const ResearchPipeline = ({ onOpenAddModal, onEditItem }) => {
  const { researchList, deleteResearchItem, updateResearchItem, userRole } = useDashboard();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'table'

  const stages = ['New', 'Researching', 'Evaluating', 'Recommended', 'Approved', 'Rejected'];

  const safeResearch = Array.isArray(researchList) ? researchList : [];

  const filteredResearch = safeResearch.filter(item => {
    if (!item) return false;
    const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchStat = statusFilter === 'All' || item.status === statusFilter;
    return matchCat && matchStat;
  });

  const categories = ['Partnership', 'Course', 'Internship', 'Event', 'Industry', 'Technology', 'Marketing', 'Business Growth'];

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Research & Opportunity Pipeline</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Stage-by-stage intelligence tracking for new courses, institutional partnerships, and expansion ideas.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="tab-pills">
            <button className={`tab-pill ${viewMode === 'board' ? 'active' : ''}`} onClick={() => setViewMode('board')}>
              Kanban Board
            </button>
            <button className={`tab-pill ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>
              Data Table
            </button>
          </div>
          {userRole === 'admin' ? (
            <button className="btn btn-primary" onClick={onOpenAddModal}>
              <Icon name="plus" size={16} />
              <span>Add Research Task</span>
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
              👁️ Live Viewer
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row card" style={{ padding: '16px 20px' }}>
        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Category:</span>
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: '180px', padding: '6px 12px' }}
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Stage:</span>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: '160px', padding: '6px 12px' }}
          >
            <option value="All">All Stages</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'board' ? (
        <div className="pipeline-board">
          {stages.map(stage => {
            const stageItems = filteredResearch.filter(item => item.status === stage);
            return (
              <div key={stage} className="pipeline-column">
                <div className="pipeline-col-header">
                  <div className="pipeline-col-title">
                    <span>{stage}</span>
                    <span className="pipeline-count-pill">{stageItems.length}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stageItems.map(item => (
                    <div key={item.id} className="pipeline-item-card" onClick={() => onEditItem(item)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="priority-badge priority-high" style={{ fontSize: '0.68rem' }}>{item.category}</span>
                        <span className={`priority-badge priority-${(item.potential || 'High').toLowerCase()}`}>{item.potential || 'High'}</span>
                      </div>
                      <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: {item.source}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.08)', padding: '6px', borderRadius: '4px' }}>
                        Rec: {item.recommendation}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span>Owner: {item.owner}</span>
                        <span>{item.deadline}</span>
                      </div>
                    </div>
                  ))}
                  {stageItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 10px', color: 'var(--text-muted)', fontSize: '0.78rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                      No items in {stage}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Opportunity Name</th>
                  <th>Category</th>
                  <th>Source</th>
                  <th>Potential</th>
                  <th>Status Stage</th>
                  <th>Research Owner</th>
                  <th>Recommendation</th>
                  <th>Next Action</th>
                  <th>Deadline</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResearch.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '700', color: '#fff' }}>{item.name}</td>
                    <td><span className="skill-tag">{item.category}</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.source}</td>
                    <td>
                      <span className={`priority-badge priority-${item.potential.toLowerCase()}`}>
                        {item.potential}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge badge-${item.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.owner}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', maxWidth: '200px' }}>{item.recommendation}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.nextAction}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.deadline}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-icon-only" onClick={() => onEditItem(item)}>
                        <Icon name="edit" size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

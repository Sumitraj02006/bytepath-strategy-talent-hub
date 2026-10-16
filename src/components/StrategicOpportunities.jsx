import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const StrategicOpportunities = ({ onOpenAddModal, onEditItem }) => {
  const { opportunitiesList, deleteOpportunityItem } = useDashboard();
  const [highPotentialOnly, setHighPotentialOnly] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [
    'College Partnerships',
    'Corporate Partnerships',
    'Workshops',
    'New Courses',
    'Internship Programs',
    'Community Collaborations',
    'Technology Opportunities'
  ];

  const safeList = Array.isArray(opportunitiesList) ? opportunitiesList : [];

  const filteredOpps = safeList.filter(o => {
    if (!o) return false;
    const matchHigh = !highPotentialOnly || o.isHighPotential;
    const matchCat = categoryFilter === 'All' || o.category === categoryFilter;
    return matchHigh && matchCat;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Strategic Opportunities</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Growth avenues across institutional MOUs, corporate upskilling, workshops, and tech leverage.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          <Icon name="plus" size={16} />
          <span>Add Strategic Opportunity</span>
        </button>
      </div>

      {/* Filters & High Potential Highlight Toggle */}
      <div className="filters-row card" style={{ padding: '16px 20px' }}>
        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Category:</span>
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: '220px', padding: '6px 12px' }}
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button
          className={`tab-pill ${highPotentialOnly ? 'active' : ''}`}
          onClick={() => setHighPotentialOnly(!highPotentialOnly)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px' }}
        >
          <Icon name="star" size={14} color={highPotentialOnly ? '#fff' : 'var(--accent-cyan)'} />
          <span>High Potential Opportunities Only</span>
        </button>
      </div>

      {/* Opportunity Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredOpps.map(opp => (
          <div key={opp.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="skill-tag" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>{opp.category}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className={`priority-badge priority-${(opp.priority || 'High').toLowerCase()}`}>{opp.priority || 'High'}</span>
                  {opp.isHighPotential && (
                    <span className="priority-badge priority-high" style={{ background: 'rgba(139, 92, 246, 0.25)', color: '#C084FC' }}>
                      HIGH POTENTIAL
                    </span>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{opp.name}</h3>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '700', textTransform: 'uppercase' }}>Estimated Impact</div>
                <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600', marginTop: '2px' }}>{opp.estimatedImpact}</div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>Next Action:</strong> {opp.nextAction}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className={`status-badge badge-${(opp.status || 'In Progress').toLowerCase().replace(/ /g, '-')}`}>
                <span className="status-dot"></span>
                {opp.status || 'In Progress'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: {opp.deadline}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="btn btn-secondary btn-icon-only" onClick={() => onEditItem(opp)}>
                  <Icon name="edit" size={14} />
                </button>
                <button className="btn btn-danger btn-icon-only" onClick={() => deleteOpportunityItem(opp.id)}>
                  <Icon name="trash" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredOpps.length === 0 && (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No opportunities match your filter selection.
          </div>
        )}
      </div>
    </div>
  );
};

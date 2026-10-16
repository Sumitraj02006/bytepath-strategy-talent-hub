import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const StrategicPriorities = ({ onOpenAddModal, onEditItem }) => {
  const { strategyList, deleteStrategyItem, updateStrategyItem, userRole } = useDashboard();
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const safeList = Array.isArray(strategyList) ? strategyList : [];

  const filteredItems = safeList.filter(item => {
    if (!item) return false;
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Strategic Priorities</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Key strategic roadmap initiatives driving BytePath Academy's expansion and institutional partnerships.
          </p>
        </div>
        {userRole === 'admin' ? (
          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <Icon name="plus" size={16} />
            <span>Add Priority Initiative</span>
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
            👁️ Live Viewer Mode (Admin Only)
          </div>
        )}
      </div>

      {/* Filters Row */}
      <div className="filters-row card" style={{ padding: '16px 20px' }}>
        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status:</span>
          {['All', 'In Progress', 'Not Started', 'Delayed', 'Completed'].map(st => (
            <button
              key={st}
              className={`tab-pill ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Priority:</span>
          {['All', 'High', 'Medium', 'Low'].map(pr => (
            <button
              key={pr}
              className={`tab-pill ${priorityFilter === pr ? 'active' : ''}`}
              onClick={() => setPriorityFilter(pr)}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Priority Name & Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Deadline</th>
                <th style={{ width: '180px' }}>Progress</th>
                <th>Next Action</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td style={{ maxWidth: '280px' }}>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge badge-${(item.status || 'In Progress').toLowerCase().replace(/ /g, '-')}`}>
                      <span className="status-dot"></span>
                      {item.status || 'In Progress'}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${(item.priority || 'High').toLowerCase()}`}>
                      {item.priority || 'High'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    {item.owner}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {item.deadline}
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className="progress-text">{item.progress}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', maxWidth: '200px' }}>
                    {item.nextAction}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {userRole === 'admin' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          className="btn btn-secondary btn-icon-only"
                          title="Edit Initiative"
                          onClick={() => onEditItem(item)}
                        >
                          <Icon name="edit" size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-icon-only"
                          title="Delete Initiative"
                          onClick={() => deleteStrategyItem(item.id)}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read Only</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No strategy initiatives match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

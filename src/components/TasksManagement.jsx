import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const TasksManagement = ({ onOpenAddTask }) => {
  const { tasksList, toggleTaskStatus, deleteTask, userRole } = useDashboard();
  const [activeTabGroup, setActiveTabGroup] = useState('Today');

  const overdueTasks = tasksList.filter(t => t.tabGroup === 'Overdue');
  const todayTasks = tasksList.filter(t => t.tabGroup === 'Today');
  const upcomingTasks = tasksList.filter(t => t.tabGroup === 'Upcoming');

  const currentTasks = activeTabGroup === 'Today' ? todayTasks : (activeTabGroup === 'Upcoming' ? upcomingTasks : overdueTasks);

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Tasks & Deadlines Management</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Operational task execution, deadline tracking, and delegation across Mayank's strategy & talent team.
          </p>
        </div>
        {userRole === 'admin' ? (
          <button className="btn btn-primary" onClick={onOpenAddTask}>
            <Icon name="plus" size={16} />
            <span>Create New Task</span>
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
            👁️ Live Viewer (Admin Only Tasks)
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="filters-row card" style={{ padding: '12px 20px' }}>
        <div className="tab-pills">
          <button
            className={`tab-pill ${activeTabGroup === 'Today' ? 'active' : ''}`}
            onClick={() => setActiveTabGroup('Today')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Icon name="clock" size={14} />
            <span>Today ({todayTasks.length})</span>
          </button>

          <button
            className={`tab-pill ${activeTabGroup === 'Upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTabGroup('Upcoming')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Icon name="calendar" size={14} />
            <span>Upcoming 7 Days ({upcomingTasks.length})</span>
          </button>

          <button
            className={`tab-pill ${activeTabGroup === 'Overdue' ? 'active' : ''}`}
            onClick={() => setActiveTabGroup('Overdue')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTabGroup === 'Overdue' ? '#EF4444' : 'transparent',
              color: activeTabGroup === 'Overdue' ? '#fff' : '#EF4444'
            }}
          >
            <Icon name="alert-triangle" size={14} />
            <span>Overdue ({overdueTasks.length})</span>
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Done</th>
                <th>Task Details</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Assigned Person</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map(t => (
                <tr key={t.id} style={{ opacity: t.status === 'Completed' ? 0.6 : 1 }}>
                  <td>
                    <button
                      className="btn btn-secondary btn-icon-only"
                      disabled={userRole !== 'admin'}
                      onClick={() => userRole === 'admin' && toggleTaskStatus(t.id)}
                      style={{
                        backgroundColor: t.status === 'Completed' ? '#10B981' : 'transparent',
                        borderColor: t.status === 'Completed' ? '#10B981' : 'var(--border-color)',
                        color: t.status === 'Completed' ? '#fff' : 'var(--text-muted)',
                        cursor: userRole === 'admin' ? 'pointer' : 'default',
                        opacity: userRole !== 'admin' && t.status !== 'Completed' ? 0.5 : 1
                      }}
                      title={userRole === 'admin' ? 'Click to toggle status' : 'Admin only'}
                    >
                      <Icon name="check" size={14} />
                    </button>
                  </td>
                  <td>
                    <div style={{
                      fontWeight: '700',
                      color: '#fff',
                      fontSize: '0.9rem',
                      textDecoration: t.status === 'Completed' ? 'line-through' : 'none'
                    }}>
                      {t.task}
                    </div>
                  </td>
                  <td><span className="skill-tag">{t.category}</span></td>
                  <td>
                    <span className={`priority-badge priority-${t.priority.toLowerCase()}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: t.tabGroup === 'Overdue' ? '#EF4444' : 'var(--text-secondary)', fontWeight: '600' }}>
                    {t.deadline}
                  </td>
                  <td>
                    <button
                      disabled={userRole !== 'admin'}
                      onClick={() => userRole === 'admin' && toggleTaskStatus(t.id)}
                      className={`status-badge badge-${t.status.toLowerCase().replace(/ /g, '-')}`}
                      style={{
                        border: 'none',
                        cursor: userRole === 'admin' ? 'pointer' : 'default'
                      }}
                      title={userRole === 'admin' ? 'Toggle status' : 'Admin only'}
                    >
                      <span className="status-dot"></span>
                      {t.status}
                    </button>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                    {t.assigned}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {userRole === 'admin' ? (
                      <button className="btn btn-danger btn-icon-only" onClick={() => deleteTask(t.id)} title="Delete Task">
                        <Icon name="trash" size={14} />
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read Only</span>
                    )}
                  </td>
                </tr>
              ))}
              {currentTasks.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No tasks in {activeTabGroup}.
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

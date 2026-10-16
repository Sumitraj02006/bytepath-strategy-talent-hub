import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Icon } from './Icons';

export const WeeklyReport = () => {
  const { kpis, strategyList, candidatesList } = useDashboard();

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div id="weekly-report-container">
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>Weekly Strategy & Talent Executive Report</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Synthesized summary report generated for Mayank Gaur — Week ending October 8, 2026.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handlePrintReport}>
          <Icon name="download" size={16} />
          <span>Export PDF / Print Report</span>
        </button>
      </div>

      {/* Summary Metrics Bar */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(145deg, #0F172A, #111827)' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Weekly Key Performance Indicators
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px', textAlign: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10B981' }}>18</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tasks Completed</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#3B82F6' }}>9</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>In Progress</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#EF4444' }}>3</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Delayed Tasks</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-purple)' }}>4</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>New Opportunities</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>48</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>New Candidates</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#EC4899' }}>5</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Research Completed</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#F59E0B' }}>6</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decisions Pending</div>
          </div>
        </div>
      </div>

      {/* 3 Callout Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Key Findings */}
        <div className="card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
          <div className="card-title" style={{ marginBottom: '16px' }}>
            <Icon name="lightbulb" size={20} color="var(--accent-cyan)" />
            <span>Key Research Findings</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>1. High Demand for AI Agentic Masterclass</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                82% of surveyed engineering students prioritized hands-on LLM agentic tool building over traditional Web2 fullstack courses.
              </div>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>2. Tier-2 Campus MOU Conversion Advantage</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Tier-2 colleges in NCR demonstrate 3x faster MOU turnaround times compared to Tier-1 universities, providing instant 1,500+ student pipeline.
              </div>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>3. Internship Screener Quality Improvement</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Adding a 20-minute practical project sample check reduced interview candidate drop-off by 40%.
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="card" style={{ borderLeft: '4px solid var(--accent-purple)' }}>
          <div className="card-title" style={{ marginBottom: '16px' }}>
            <Icon name="check-square" size={20} color="var(--accent-purple)" />
            <span>Recommended Strategic Actions</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>1. Sign Off College MOUs Before Mid-Terms</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Execute final campus MOU visits to DTU, NSUT, and Kirori Mal before semester exam schedules begin.
              </div>
            </div>

            <div style={{ background: 'rgba(139, 92, 246, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>2. Issue Candidate Offers Immediately</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Approve offers for Aarav Sharma (Web Dev) & Divya Nair (Design) to meet immediate Q4 product launch goals.
              </div>
            </div>

            <div style={{ background: 'rgba(139, 92, 246, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.88rem' }}>3. Launch B2B Enterprise AI Pilot</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Approve corporate upskilling pitch deck for mid-market IT client pitches starting next Monday.
              </div>
            </div>
          </div>
        </div>

        {/* Major Risks */}
        <div className="card" style={{ borderLeft: '4px solid #EF4444' }}>
          <div className="card-title" style={{ marginBottom: '16px' }}>
            <Icon name="alert-triangle" size={20} color="#EF4444" />
            <span>Major Risks & Vulnerabilities</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#EF4444', fontSize: '0.88rem' }}>1. Industry Collaboration MOU Bottleneck</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Delayed corporate feedback risks pushing student capstone projects into December. Immediate follow-up needed.
              </div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.06)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ fontWeight: '700', color: '#EF4444', fontSize: '0.88rem' }}>2. Growth Marketing Team Capacity Deficit (50%)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Understaffing in growth marketing is slowing candidate outreach and webinar promotion velocity.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

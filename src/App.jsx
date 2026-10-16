import React, { useState, Component } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { ExecutiveOverview } from './components/ExecutiveOverview';
import { StrategicPriorities } from './components/StrategicPriorities';
import { ResearchPipeline } from './components/ResearchPipeline';
import { TalentAcquisition } from './components/TalentAcquisition';
import { CandidatePipeline } from './components/CandidatePipeline';
import { TeamOverview } from './components/TeamOverview';
import { StrategicOpportunities } from './components/StrategicOpportunities';
import { TasksManagement } from './components/TasksManagement';
import { WeeklyReport } from './components/WeeklyReport';
import { SettingsView } from './components/SettingsView';

import {
  AddStrategyModal,
  AddResearchModal,
  AddOpportunityModal,
  AddCandidateModal,
  AddTaskModal,
  AddMemberModal,
  AddPositionModal
} from './components/Modals/ItemModals';
import { LiveSyncIndicator } from './components/LiveSyncIndicator';
import { BroadcastAnnouncementModal } from './components/Modals/BroadcastAnnouncementModal';
import { AdminConsole } from './components/AdminConsole';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard caught rendering error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0B0F19',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            backgroundColor: '#111827',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
          }}>
            <h2 style={{ fontSize: '1.4rem', color: '#EF4444', marginBottom: '12px', fontWeight: '800' }}>
              BytePath Command Center Recovery
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '20px', lineHeight: '1.5' }}>
              A temporary rendering issue occurred. Click below to restore default BytePath Academy state.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Restore & Reload Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const DashboardContent = () => {
  const { activeTab, isBroadcastOpen, setIsBroadcastOpen } = useDashboard();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Modal controls
  const [modalType, setModalType] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const handleOpenAdd = (type) => {
    setEditItem(null);
    setModalType(type);
  };

  const handleOpenEdit = (type, item) => {
    setEditItem(item);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditItem(null);
  };

  return (
    <div className="app-container">
      {/* Real-time Live Announcement Banner & Floating Sync Toasts */}
      <LiveSyncIndicator />

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="main-wrapper">
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <main className="content-area">
          {activeTab === 'admin-console' && <AdminConsole />}
          {activeTab === 'dashboard' && <ExecutiveOverview />}
          {activeTab === 'strategy' && <StrategicPriorities onOpenAddModal={() => handleOpenAdd('strategy')} onEditItem={(item) => handleOpenEdit('strategy', item)} />}
          {activeTab === 'research' && <ResearchPipeline onOpenAddModal={() => handleOpenAdd('research')} onEditItem={(item) => handleOpenEdit('research', item)} />}
          {activeTab === 'opportunities' && <StrategicOpportunities onOpenAddModal={() => handleOpenAdd('opportunity')} onEditItem={(item) => handleOpenEdit('opportunity', item)} />}
          {activeTab === 'talent' && <TalentAcquisition onOpenAddPosition={() => handleOpenAdd('position')} />}
          {activeTab === 'candidates' && <CandidatePipeline onOpenAddModal={() => handleOpenAdd('candidate')} onEditCandidate={(cand) => handleOpenEdit('candidate', cand)} />}
          {activeTab === 'team' && <TeamOverview onOpenAddMember={() => handleOpenAdd('member')} />}
          {activeTab === 'tasks' && <TasksManagement onOpenAddTask={() => handleOpenAdd('task')} />}
          {activeTab === 'reports' && <WeeklyReport />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      <GlobalSearchModal />

      {/* Dynamic Item Modals */}
      <AddStrategyModal isOpen={modalType === 'strategy'} onClose={handleCloseModal} editItem={editItem} />
      <AddResearchModal isOpen={modalType === 'research'} onClose={handleCloseModal} editItem={editItem} />
      <AddOpportunityModal isOpen={modalType === 'opportunity'} onClose={handleCloseModal} editItem={editItem} />
      <AddCandidateModal isOpen={modalType === 'candidate'} onClose={handleCloseModal} />
      <AddTaskModal isOpen={modalType === 'task'} onClose={handleCloseModal} />
      <AddMemberModal isOpen={modalType === 'member'} onClose={handleCloseModal} />
      <AddPositionModal isOpen={modalType === 'position'} onClose={handleCloseModal} />
      
      {/* Real-Time Socket.io Live Broadcast Modal */}
      <BroadcastAnnouncementModal isOpen={isBroadcastOpen} onClose={() => setIsBroadcastOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ErrorBoundary>
  );
}

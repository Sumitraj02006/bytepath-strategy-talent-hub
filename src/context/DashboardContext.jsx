import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  broadcastLocalChange,
  subscribeLocalChanges,
  subscribeToSupabaseTable,
  isSupabaseConfigured
} from '../services/supabase';
import { socketService } from '../services/socket';

const DashboardContext = createContext();

const initialKpis = [
  { id: 'kpi-1', label: 'Active Projects', value: 12, trend: '+18%', isPositive: true, period: 'vs last month', detail: '4 launch-ready' },
  { id: 'kpi-2', label: 'Open Opportunities', value: 15, trend: '+25%', isPositive: true, period: 'vs last month', detail: '7 high potential' },
  { id: 'kpi-3', label: 'Research Tasks', value: 9, trend: '+12%', isPositive: true, period: 'vs last month', detail: '3 in evaluation stage' },
  { id: 'kpi-4', label: 'Open Positions', value: 5, trend: '+2 positions', isPositive: true, period: 'vs prev quarter', detail: '3 intern, 2 core' },
  { id: 'kpi-5', label: 'Candidates in Pipeline', value: 48, trend: '+34%', isPositive: true, period: 'vs last month', detail: '12 shortlisted' },
  { id: 'kpi-6', label: 'Pending Decisions', value: 6, trend: '-2 pending', isPositive: true, period: 'vs last week', detail: 'Requires Mayank approval' },
];

const initialStrategy = [
  {
    id: 'strat-1',
    name: 'College Partnership Initiative',
    description: 'Formalize MOU with top 15 engineering & management colleges in North India for campus placements & workshop access.',
    status: 'In Progress',
    priority: 'High',
    owner: 'Mayank Gaur',
    deadline: '2026-10-25',
    progress: 65,
    nextAction: 'Finalize draft MOU agreements with IIT/NIT placement cells.'
  },
  {
    id: 'strat-2',
    name: 'New Course Research & Launch',
    description: 'Market analysis & curriculum outline for AI/ML Engineering & Agentic Coding Masterclass.',
    status: 'In Progress',
    priority: 'High',
    owner: 'Dr. Ananya Sharma',
    deadline: '2026-11-05',
    progress: 40,
    nextAction: 'Synthesize industry skill gap report & mentor survey.'
  },
  {
    id: 'strat-3',
    name: 'Internship & Mentorship Program',
    description: 'Structured 3-month talent incubator program across content, tech, and marketing.',
    status: 'In Progress',
    priority: 'High',
    owner: 'Mayank Gaur',
    deadline: '2026-10-18',
    progress: 80,
    nextAction: 'Conduct final round interviews for Content & Web Dev interns.'
  },
  {
    id: 'strat-4',
    name: 'Student Growth & Engagement Strategy',
    description: 'Implement referral loops, community hackathons, and career guidance webinars to double enrollment.',
    status: 'Not Started',
    priority: 'Medium',
    owner: 'Rohan Mehta',
    deadline: '2026-11-20',
    progress: 10,
    nextAction: 'Schedule strategy align call with growth marketing team.'
  },
  {
    id: 'strat-5',
    name: 'Industry Collaboration Hub',
    description: 'Partner with tech mid-market companies for real-world capstone projects for BytePath students.',
    status: 'Delayed',
    priority: 'High',
    owner: 'Mayank Gaur',
    deadline: '2026-10-12',
    progress: 30,
    nextAction: 'Follow up with corporate outreach partners regarding MOUs.'
  },
  {
    id: 'strat-6',
    name: 'Alumni Mentorship Network',
    description: 'Build a peer mentorship network connecting BytePath graduates with current cohorts.',
    status: 'Completed',
    priority: 'Medium',
    owner: 'Priya Verma',
    deadline: '2026-10-01',
    progress: 100,
    nextAction: 'Launch pilot onboarding for first 50 mentors.'
  }
];

const initialResearch = [
  {
    id: 'res-1',
    name: 'AI Agentic Coding Bootcamp',
    category: 'Course',
    source: 'Industry Demand Survey',
    potential: 'High',
    status: 'Recommended',
    owner: 'Dr. Ananya Sharma',
    recommendation: 'Proceed with 6-week module structure & project evaluation.',
    nextAction: 'Review module learning outcomes with lead mentor.',
    deadline: '2026-10-15'
  },
  {
    id: 'res-2',
    name: 'Tier-1 College Hackathon Sponsorship',
    category: 'Event',
    source: 'IIT Delhi E-Cell',
    potential: 'High',
    status: 'Evaluating',
    owner: 'Mayank Gaur',
    recommendation: 'Sponsor tier-2 title badge for high brand visibility.',
    nextAction: 'Calculate ROI vs student acquisition cost.',
    deadline: '2026-10-22'
  },
  {
    id: 'res-3',
    name: 'Corporate AI Upskilling Program',
    category: 'Business Growth',
    source: 'B2B Outreach',
    potential: 'High',
    status: 'Approved',
    owner: 'Mayank Gaur',
    recommendation: 'Launch B2B customized cohort package for IT firms.',
    nextAction: 'Draft proposal presentation for enterprise clients.',
    deadline: '2026-10-30'
  },
  {
    id: 'res-4',
    name: 'EdTech LMS Integration Partnership',
    category: 'Technology',
    source: 'Vendor Pitch',
    potential: 'Medium',
    status: 'Researching',
    owner: 'Siddharth Rao',
    recommendation: 'Compare native vs API integration costs & performance.',
    nextAction: 'Test API sandbox endpoint performance.',
    deadline: '2026-11-02'
  },
  {
    id: 'res-5',
    name: 'Web3 & Blockchain Fundamentals Module',
    category: 'Course',
    source: 'Student Poll',
    potential: 'Low',
    status: 'Rejected',
    owner: 'Research Team',
    recommendation: 'De-prioritize due to low market placement demand.',
    nextAction: 'Archive research document in knowledge base.',
    deadline: '2026-10-05'
  },
  {
    id: 'res-6',
    name: 'Pan-India Student Ambassador Program',
    category: 'Marketing',
    source: 'Internal Strategy',
    potential: 'High',
    status: 'New',
    owner: 'Mayank Gaur',
    recommendation: 'Recruit 50 campus ambassadors across top tier-2 cities.',
    nextAction: 'Draft ambassador incentive guidelines.',
    deadline: '2026-10-28'
  }
];

const initialOpportunities = [
  {
    id: 'opp-1',
    name: 'Tier-1 College MoU Partnerships',
    category: 'College Partnerships',
    potential: 'High',
    priority: 'High',
    status: 'In Progress',
    estimatedImpact: '1,500+ direct student enrollment pipeline',
    nextAction: 'Schedule campus visits & MoU signatures.',
    deadline: '2026-10-25',
    isHighPotential: true
  },
  {
    id: 'opp-2',
    name: 'Enterprise B2B Upskilling Packages',
    category: 'Corporate Partnerships',
    potential: 'High',
    priority: 'High',
    status: 'Evaluating',
    estimatedImpact: '$45,000 ARR corporate training revenue',
    nextAction: 'Draft enterprise pitch deck & case studies.',
    deadline: '2026-10-30',
    isHighPotential: true
  },
  {
    id: 'opp-3',
    name: 'Weekly AI Agent Masterclass Workshops',
    category: 'Workshops',
    potential: 'High',
    priority: 'High',
    status: 'Approved',
    estimatedImpact: '500+ attendees per workshop, 15% conversion',
    nextAction: 'Set up registration landing page & campaign.',
    deadline: '2026-10-18',
    isHighPotential: true
  },
  {
    id: 'opp-4',
    name: 'Agentic Software Development Diploma',
    category: 'New Courses',
    potential: 'High',
    priority: 'Medium',
    status: 'Researching',
    estimatedImpact: 'Flagship 6-month specialized course offering',
    nextAction: 'Review syllabus with industry advisors.',
    deadline: '2026-11-15',
    isHighPotential: true
  },
  {
    id: 'opp-5',
    name: 'Fall Talent Incubator Cohort',
    category: 'Internship Programs',
    potential: 'Medium',
    priority: 'High',
    status: 'In Progress',
    estimatedImpact: '15 high-performing interns across BytePath',
    nextAction: 'Finalize candidate offer letters.',
    deadline: '2026-10-14',
    isHighPotential: false
  },
  {
    id: 'opp-6',
    name: 'National Developer Community Hackathon',
    category: 'Community Collaborations',
    potential: 'High',
    priority: 'Medium',
    status: 'Evaluating',
    estimatedImpact: '10,000+ brand impressions in dev community',
    nextAction: 'Confirm co-sponsors & prize pool.',
    deadline: '2026-11-10',
    isHighPotential: true
  },
  {
    id: 'opp-7',
    name: 'AI Automated Assessment Platform',
    category: 'Technology Opportunities',
    potential: 'Medium',
    priority: 'Low',
    status: 'Not Started',
    estimatedImpact: '50% reduction in evaluation lead time',
    nextAction: 'Evaluate open-source LLM grading pipelines.',
    deadline: '2026-12-01',
    isHighPotential: false
  }
];

const initialFunnel = {
  stages: [
    { name: 'Applications', count: 240, percentage: 100, color: '#3B82F6' },
    { name: 'Shortlisted', count: 84, percentage: 35, color: '#06B6D4' },
    { name: 'Interview', count: 36, percentage: 15, color: '#8B5CF6' },
    { name: 'Selected', count: 14, percentage: 5.8, color: '#EC4899' },
    { name: 'Joined', count: 10, percentage: 4.2, color: '#10B981' }
  ],
  stats: {
    totalApplications: 240,
    shortlisted: 84,
    interviewsScheduled: 12,
    selected: 14,
    joined: 10,
    rejected: 120,
    pendingDecisions: 6
  },
  trends: [
    { month: 'May', applications: 110, shortlisted: 38, joined: 4 },
    { month: 'Jun', applications: 145, shortlisted: 50, joined: 6 },
    { month: 'Jul', applications: 180, shortlisted: 62, joined: 7 },
    { month: 'Aug', applications: 210, shortlisted: 74, joined: 8 },
    { month: 'Sep', applications: 225, shortlisted: 79, joined: 9 },
    { month: 'Oct', applications: 240, shortlisted: 84, joined: 10 }
  ]
};

const initialPositions = [
  { id: 'pos-1', title: 'Social Media Marketing Intern', applications: 68, shortlisted: 22, interviews: 8, selected: 3, status: 'Open', department: 'Marketing' },
  { id: 'pos-2', title: 'Content Intern', applications: 54, shortlisted: 18, interviews: 6, selected: 2, status: 'Open', department: 'Content' },
  { id: 'pos-3', title: 'Web Development Intern', applications: 72, shortlisted: 26, interviews: 10, selected: 4, status: 'Open', department: 'Technology' },
  { id: 'pos-4', title: 'Research Intern', applications: 30, shortlisted: 10, interviews: 4, selected: 2, status: 'In Review', department: 'Research' },
  { id: 'pos-5', title: 'Graphic Design Intern', applications: 16, shortlisted: 8, interviews: 4, selected: 3, status: 'Filled', department: 'Design' }
];

const initialCandidates = [
  {
    id: 'cand-1',
    name: 'Aarav Sharma',
    position: 'Web Development Intern',
    appliedDate: '2026-10-02',
    stage: 'Interviewed',
    interviewDate: '2026-10-06 15:30',
    interviewScore: '9.2 / 10',
    skills: ['React', 'Node.js', 'TailwindCSS', 'Git', 'REST APIs'],
    recommendation: 'Strong Hire — Excellent fullstack skills & clean code practices.',
    decision: 'Selected',
    nextAction: 'Send formal offer letter & onboarding schedule.',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    college: 'Delhi Technological University (DTU)',
    notes: 'Demonstrated strong portfolio in fullstack web apps. Impressive live coding performance.'
  },
  {
    id: 'cand-2',
    name: 'Sneha Patel',
    position: 'Content Intern',
    appliedDate: '2026-10-04',
    stage: 'Interview Scheduled',
    interviewDate: '2026-10-10 14:00',
    interviewScore: '8.5 / 10',
    skills: ['SEO Copywriting', 'Technical Writing', 'Canva', 'Social Media'],
    recommendation: 'High Potential — Great storytelling style.',
    decision: 'Pending',
    nextAction: 'Conduct Round 2 technical writing interview with Mayank.',
    email: 'sneha.patel@example.com',
    phone: '+91 98123 45678',
    college: 'Kirori Mal College, Delhi University',
    notes: 'Submitted impressive sample tech breakdown of AI tools.'
  },
  {
    id: 'cand-3',
    name: 'Rohan Kapoor',
    position: 'Research Intern',
    appliedDate: '2026-09-28',
    stage: 'Shortlisted',
    interviewDate: '2026-10-11 11:30',
    interviewScore: '8.8 / 10',
    skills: ['Market Research', 'Data Analysis', 'Python', 'Excel', 'Synthesizing'],
    recommendation: 'Good Fit — Analytical mindset for competitor research.',
    decision: 'Pending',
    nextAction: 'Schedule Round 1 interview with Dr. Ananya.',
    email: 'rohan.k@example.com',
    phone: '+91 99887 76655',
    college: 'Netaji Subhas University of Technology (NSUT)',
    notes: 'Strong academic background in engineering & economics.'
  },
  {
    id: 'cand-4',
    name: 'Vikramaditya Roy',
    position: 'Social Media Marketing Intern',
    appliedDate: '2026-09-25',
    stage: 'Joined',
    interviewDate: '2026-09-29 16:00',
    interviewScore: '9.5 / 10',
    skills: ['Video Editing', 'Instagram Reels', 'Growth Hacking', 'Analytics'],
    recommendation: 'Top Hire — Exceptional content creation velocity.',
    decision: 'Joined',
    nextAction: 'Onboard to weekly campaign schedule & asset drive.',
    email: 'vikram.roy@example.com',
    phone: '+91 97112 23344',
    college: 'Guru Gobind Singh Indraprastha University',
    notes: 'Created viral reel campaign generating 45k impressions.'
  },
  {
    id: 'cand-5',
    name: 'Divya Nair',
    position: 'Graphic Design Intern',
    appliedDate: '2026-10-01',
    stage: 'Selected',
    interviewDate: '2026-10-05 12:00',
    interviewScore: '9.0 / 10',
    skills: ['Figma', 'UI/UX', 'Photoshop', 'Brand Aesthetics'],
    recommendation: 'Strong Hire — Modern SaaS dark aesthetic portfolio.',
    decision: 'Selected',
    nextAction: 'Await candidate offer acceptance confirmation.',
    email: 'divya.n@example.com',
    phone: '+91 96543 21098',
    college: 'National Institute of Fashion Technology (NIFT Delhi)',
    notes: 'Designed sleek UI mockups for BytePath landing page.'
  },
  {
    id: 'cand-6',
    name: 'Karan Verma',
    position: 'Web Development Intern',
    appliedDate: '2026-10-03',
    stage: 'Applied',
    interviewDate: '—',
    interviewScore: 'Pending',
    skills: ['HTML/CSS', 'JavaScript', 'Bootstrap'],
    recommendation: 'Initial screening pending.',
    decision: 'Pending',
    nextAction: 'Review GitHub repository link & resume.',
    email: 'karan.v@example.com',
    phone: '+91 95432 10987',
    college: 'VIT Vellore',
    notes: 'Self-taught web developer with 2 personal project links.'
  }
];

const initialTeam = {
  coreMembers: [
    { id: 'tm-1', name: 'Mayank Gaur', role: 'Head of Strategy, Research & Talent Acquisition', dept: 'Executive', email: 'mayank.gaur@bytepath.edu', avatar: 'MG', status: 'Active' },
    { id: 'tm-2', name: 'Dr. Ananya Sharma', role: 'Lead Research & Curriculum Strategist', dept: 'Research', email: 'ananya.sharma@bytepath.edu', avatar: 'AS', status: 'Active' },
    { id: 'tm-3', name: 'Rohan Mehta', role: 'Growth Marketing Manager', dept: 'Marketing', email: 'rohan.mehta@bytepath.edu', avatar: 'RM', status: 'Active' },
    { id: 'tm-4', name: 'Priya Verma', role: 'Talent Operations & HR Lead', dept: 'Talent', email: 'priya.verma@bytepath.edu', avatar: 'PV', status: 'Active' },
    { id: 'tm-5', name: 'Siddharth Rao', role: 'Tech Lead & Fullstack Architect', dept: 'Technology', email: 'siddharth.rao@bytepath.edu', avatar: 'SR', status: 'Active' },
    { id: 'tm-6', name: 'Neha Gupta', role: 'Community & Partnership Coordinator', dept: 'Partnerships', email: 'neha.gupta@bytepath.edu', avatar: 'NG', status: 'Active' }
  ],
  stats: {
    coreCount: 6,
    internsCount: 12,
    volunteersCount: 18,
    openRoles: 5,
    availableTalentPool: 48,
    recruitmentNeeded: 3
  },
  capacity: [
    { department: 'Strategy & Research', current: 85, required: 100, status: 'Moderate Deficit' },
    { department: 'Talent & HR', current: 60, required: 100, status: 'High Deficit' },
    { department: 'Tech & Development', current: 75, required: 100, status: 'Moderate Deficit' },
    { department: 'Growth Marketing', current: 50, required: 100, status: 'Critical Deficit' },
    { department: 'Content Creation', current: 70, required: 100, status: 'Moderate Deficit' }
  ]
};

const initialTasks = [
  {
    id: 'tsk-1',
    task: 'Follow up with IIT Placement Cell for MoU draft approval',
    category: 'Partnership',
    priority: 'High',
    deadline: '2026-10-06',
    status: 'In Progress',
    assigned: 'Mayank Gaur',
    tabGroup: 'Overdue'
  },
  {
    id: 'tsk-2',
    task: 'Review market benchmark report for AI Bootcamp pricing',
    category: 'Research',
    priority: 'High',
    deadline: '2026-10-07',
    status: 'To Do',
    assigned: 'Dr. Ananya Sharma',
    tabGroup: 'Overdue'
  },
  {
    id: 'tsk-3',
    task: 'Conduct final round interview with Aarav Sharma (Web Dev)',
    category: 'Talent',
    priority: 'High',
    deadline: '2026-10-08',
    status: 'In Progress',
    assigned: 'Mayank Gaur',
    tabGroup: 'Today'
  },
  {
    id: 'tsk-4',
    task: 'Approve weekly content incubator campaign calendar',
    category: 'Operations',
    priority: 'Medium',
    deadline: '2026-10-08',
    status: 'To Do',
    assigned: 'Mayank Gaur',
    tabGroup: 'Today'
  },
  {
    id: 'tsk-5',
    task: 'Send offer letter details to Divya Nair (Graphic Design)',
    category: 'Talent',
    priority: 'High',
    deadline: '2026-10-08',
    status: 'To Do',
    assigned: 'Priya Verma',
    tabGroup: 'Today'
  },
  {
    id: 'tsk-6',
    task: 'Draft proposal deck for Enterprise AI Upskilling B2B',
    category: 'Strategy',
    priority: 'High',
    deadline: '2026-10-12',
    status: 'To Do',
    assigned: 'Mayank Gaur',
    tabGroup: 'Upcoming'
  },
  {
    id: 'tsk-7',
    task: 'Finalize college ambassador incentive policy document',
    category: 'Strategy',
    priority: 'Medium',
    deadline: '2026-10-14',
    status: 'To Do',
    assigned: 'Mayank Gaur',
    tabGroup: 'Upcoming'
  },
  {
    id: 'tsk-8',
    task: 'Conduct monthly performance sync with research interns',
    category: 'Talent',
    priority: 'Medium',
    deadline: '2026-10-15',
    status: 'To Do',
    assigned: 'Dr. Ananya Sharma',
    tabGroup: 'Upcoming'
  }
];

const initialNotifications = [
  { id: 'notif-1', category: 'candidate', title: 'New Candidate Application', message: 'Aarav Sharma applied for Web Development Intern position.', time: '10 mins ago', isRead: false },
  { id: 'notif-2', category: 'interview', title: 'Upcoming Interview Reminder', message: 'Sneha Patel scheduled for Content Intern interview at 2:00 PM today.', time: '1 hour ago', isRead: false },
  { id: 'notif-3', category: 'deadline', title: 'Overdue Task Alert', message: 'Follow up with IIT Placement Cell was due Oct 6.', time: '2 hours ago', isRead: false },
  { id: 'notif-4', category: 'strategy', title: 'Strategy Priority Delayed', message: 'Industry Collaboration Hub status updated to Delayed.', time: '4 hours ago', isRead: false },
  { id: 'notif-5', category: 'opportunity', title: 'High Potential Opportunity', message: 'Enterprise B2B Upskilling package marked as Approved.', time: 'Yesterday', isRead: true },
  { id: 'notif-6', category: 'approval', title: 'Pending Approval Required', message: '3 Candidate offer letters waiting for Mayank signature.', time: 'Yesterday', isRead: true },
  { id: 'notif-7', category: 'team', title: 'Team Update', message: 'Vikramaditya Roy officially joined as Social Media Marketing Intern.', time: '2 days ago', isRead: true }
];

export const DashboardProvider = ({ children }) => {
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`bytepath_${key}`);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (!parsed) return fallback;
      if (Array.isArray(fallback)) {
        if (!Array.isArray(parsed)) return fallback;
        return parsed.filter(Boolean).map(item => ({
          status: 'In Progress',
          priority: 'High',
          stage: 'Applied',
          potential: 'High',
          skills: [],
          ...item
        }));
      }
      return parsed;
    } catch (e) {
      return fallback;
    }
  };

  // Role Management: 'admin' vs 'user'
  const getInitialRole = () => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlRole = params.get('role');
        if (urlRole === 'admin' || urlRole === 'user') return urlRole;
        const saved = localStorage.getItem('bytepath_user_role');
        if (saved === 'admin' || saved === 'user') return saved;
      } catch (e) {}
    }
    return 'admin';
  };

  const [userRole, setUserRoleState] = useState(getInitialRole);
  const [socketConnected, setSocketConnected] = useState(false);
  const [presenceStats, setPresenceStats] = useState({ admins: 1, users: 0, total: 1 });
  const [liveToast, setLiveToast] = useState(null);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  const setUserRole = (role) => {
    setUserRoleState(role);
    try {
      localStorage.setItem('bytepath_user_role', role);
      const url = new URL(window.location);
      url.searchParams.set('role', role);
      window.history.replaceState({}, '', url);
    } catch (e) {}
    socketService.setRole(role, role === 'admin' ? 'Mayank Gaur (Admin)' : 'Team Member (User)');
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const [kpis, setKpis] = useState(() => loadState('kpis', initialKpis));
  const [strategyList, setStrategyList] = useState(() => loadState('strategy', initialStrategy));
  const [researchList, setResearchList] = useState(() => loadState('research', initialResearch));
  const [opportunitiesList, setOpportunitiesList] = useState(() => loadState('opportunities', initialOpportunities));
  const [funnelData, setFunnelData] = useState(() => loadState('funnel', initialFunnel));
  const [positionsList, setPositionsList] = useState(() => loadState('positions', initialPositions));
  const [candidatesList, setCandidatesList] = useState(() => loadState('candidates', initialCandidates));
  const [teamData, setTeamData] = useState(() => loadState('team', initialTeam));
  const [tasksList, setTasksList] = useState(() => loadState('tasks', initialTasks));
  const [notifications, setNotifications] = useState(() => loadState('notifications', initialNotifications));

  // Auto-sync to LocalStorage safely
  useEffect(() => {
    try { localStorage.setItem('bytepath_kpis', JSON.stringify(kpis)); } catch(e){}
  }, [kpis]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_strategy', JSON.stringify(strategyList)); } catch(e){}
  }, [strategyList]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_research', JSON.stringify(researchList)); } catch(e){}
  }, [researchList]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_opportunities', JSON.stringify(opportunitiesList)); } catch(e){}
  }, [opportunitiesList]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_positions', JSON.stringify(positionsList)); } catch(e){}
  }, [positionsList]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_candidates', JSON.stringify(candidatesList)); } catch(e){}
  }, [candidatesList]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_tasks', JSON.stringify(tasksList)); } catch(e){}
  }, [tasksList]);
  useEffect(() => {
    try { localStorage.setItem('bytepath_notifications', JSON.stringify(notifications)); } catch(e){}
  }, [notifications]);

  // Real-time Socket.io Integration & Multi-Tab Broadcast synchronization
  useEffect(() => {
    // 1. Connect Socket.io client
    socketService.connect(userRole, userRole === 'admin' ? 'Mayank Gaur (Admin)' : 'Team Member (User)');

    const unsubConn = socketService.subscribe('connection_status', ({ connected }) => {
      setSocketConnected(connected);
    });

    const unsubPresence = socketService.subscribe('presence', (stats) => {
      if (stats) setPresenceStats(stats);
    });

    const unsubSync = socketService.subscribe('sync_update', (syncData) => {
      if (!syncData || !syncData.actionType) return;
      const { actionType, payload, message, sender } = syncData;

      // Apply update directly to state in real-time
      switch (actionType) {
        case 'ADD_STRATEGY':
          setStrategyList(prev => [payload, ...(Array.isArray(prev) ? prev : [])]);
          break;
        case 'UPDATE_STRATEGY':
          setStrategyList(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === payload.id ? { ...item, ...payload.updated } : item));
          break;
        case 'DELETE_STRATEGY':
          setStrategyList(prev => (Array.isArray(prev) ? prev : []).filter(item => item.id !== payload.id));
          break;

        case 'ADD_RESEARCH':
          setResearchList(prev => [payload, ...(Array.isArray(prev) ? prev : [])]);
          break;
        case 'UPDATE_RESEARCH':
          setResearchList(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === payload.id ? { ...item, ...payload.updated } : item));
          break;
        case 'DELETE_RESEARCH':
          setResearchList(prev => (Array.isArray(prev) ? prev : []).filter(item => item.id !== payload.id));
          break;

        case 'ADD_OPPORTUNITY':
          setOpportunitiesList(prev => [payload, ...(Array.isArray(prev) ? prev : [])]);
          break;
        case 'UPDATE_OPPORTUNITY':
          setOpportunitiesList(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === payload.id ? { ...item, ...payload.updated } : item));
          break;
        case 'DELETE_OPPORTUNITY':
          setOpportunitiesList(prev => (Array.isArray(prev) ? prev : []).filter(item => item.id !== payload.id));
          break;

        case 'ADD_CANDIDATE':
          setCandidatesList(prev => [payload, ...(Array.isArray(prev) ? prev : [])]);
          break;
        case 'UPDATE_CANDIDATE_STAGE':
          setCandidatesList(prev => (Array.isArray(prev) ? prev : []).map(c => {
            if (c.id === payload.id) {
              return { ...c, stage: payload.stage, decision: payload.decision || c.decision };
            }
            return c;
          }));
          break;
        case 'UPDATE_CANDIDATE':
          setCandidatesList(prev => (Array.isArray(prev) ? prev : []).map(c => c.id === payload.id ? { ...c, ...payload.updated } : c));
          break;
        case 'DELETE_CANDIDATE':
          setCandidatesList(prev => (Array.isArray(prev) ? prev : []).filter(c => c.id !== payload.id));
          break;

        case 'ADD_TASK':
          setTasksList(prev => [payload, ...(Array.isArray(prev) ? prev : [])]);
          break;
        case 'TOGGLE_TASK':
          setTasksList(prev => (Array.isArray(prev) ? prev : []).map(t => t.id === payload.id ? { ...t, status: payload.nextStatus } : t));
          break;
        case 'DELETE_TASK':
          setTasksList(prev => (Array.isArray(prev) ? prev : []).filter(t => t.id !== payload.id));
          break;

        case 'ADD_POSITION':
          setPositionsList(prev => [...(Array.isArray(prev) ? prev : []), payload]);
          break;
        case 'ADD_TEAM_MEMBER':
          setTeamData(prev => ({
            ...prev,
            coreMembers: [...(prev.coreMembers || []), payload],
            stats: { ...(prev.stats || {}), coreCount: (prev.stats?.coreCount || 0) + 1 }
          }));
          break;
        case 'RESET_DATA':
          setKpis(initialKpis);
          setStrategyList(initialStrategy);
          setResearchList(initialResearch);
          setOpportunitiesList(initialOpportunities);
          setPositionsList(initialPositions);
          setCandidatesList(initialCandidates);
          setTeamData(initialTeam);
          setTasksList(initialTasks);
          break;
        default:
          break;
      }

      // Show real-time notification toast
      setLiveToast({
        show: true,
        message: message || `Updated: ${actionType.replace('_', ' ')}`,
        actionType,
        sender: sender || 'Admin',
        timestamp: Date.now()
      });
    });

    const unsubAnnounce = socketService.subscribe('announcement', (announcement) => {
      setActiveAnnouncement(announcement);
    });

    const unsubAnnounceClear = socketService.subscribe('announcement_cleared', () => {
      setActiveAnnouncement(null);
    });

    // 2. BroadcastChannel fallback for multi-tab
    const unsubLocal = subscribeLocalChanges(({ type, payload }) => {
      if (type === 'SYNC_STATE' && payload) {
        if (payload.strategyList) setStrategyList(payload.strategyList);
        if (payload.researchList) setResearchList(payload.researchList);
        if (payload.opportunitiesList) setOpportunitiesList(payload.opportunitiesList);
        if (payload.candidatesList) setCandidatesList(payload.candidatesList);
        if (payload.tasksList) setTasksList(payload.tasksList);
        if (payload.positionsList) setPositionsList(payload.positionsList);
        if (payload.notifications) setNotifications(payload.notifications);
        if (payload.teamData) setTeamData(payload.teamData);
      }
    });

    return () => {
      unsubConn();
      unsubPresence();
      unsubSync();
      unsubAnnounce();
      unsubAnnounceClear();
      unsubLocal();
    };
  }, [userRole]);

  // Toast Auto Dismiss
  useEffect(() => {
    if (liveToast?.show) {
      const timer = setTimeout(() => {
        setLiveToast(prev => prev ? { ...prev, show: false } : null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [liveToast]);

  const dismissLiveToast = () => {
    setLiveToast(prev => prev ? { ...prev, show: false } : null);
  };

  const dismissActiveAnnouncement = () => {
    setActiveAnnouncement(null);
  };

  const sendLiveAnnouncement = (title, message, priority = 'high') => {
    socketService.emitAnnouncement(title, message, priority);
    setActiveAnnouncement({
      id: `ann-${Date.now()}`,
      title,
      message,
      priority,
      sender: 'Mayank Gaur (Admin)',
      timestamp: Date.now()
    });
  };

  const clearLiveAnnouncement = () => {
    socketService.clearAnnouncement();
    setActiveAnnouncement(null);
  };

  // Admin Actions with Socket.io Broadcasting
  const addStrategyItem = (newItem) => {
    const item = { ...newItem, id: `strat-${Date.now()}` };
    setStrategyList(prev => [item, ...(Array.isArray(prev) ? prev : [])]);
    socketService.emitAdminAction(
      'ADD_STRATEGY',
      item,
      `Admin added new Strategy Priority: "${item.name}"`
    );
  };

  const updateStrategyItem = (id, updated) => {
    setStrategyList(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === id ? { ...item, ...updated } : item));
    socketService.emitAdminAction(
      'UPDATE_STRATEGY',
      { id, updated },
      `Admin updated Strategy Priority status/progress`
    );
  };

  const deleteStrategyItem = (id) => {
    setStrategyList(prev => (Array.isArray(prev) ? prev : []).filter(item => item.id !== id));
    socketService.emitAdminAction(
      'DELETE_STRATEGY',
      { id },
      `Admin removed a Strategy Priority`
    );
  };

  const addResearchItem = (newItem) => {
    const item = { ...newItem, id: `res-${Date.now()}` };
    setResearchList(prev => [item, ...(Array.isArray(prev) ? prev : [])]);
    socketService.emitAdminAction(
      'ADD_RESEARCH',
      item,
      `Admin added Research Pipeline project: "${item.name}"`
    );
  };

  const updateResearchItem = (id, updated) => {
    setResearchList(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === id ? { ...item, ...updated } : item));
    socketService.emitAdminAction(
      'UPDATE_RESEARCH',
      { id, updated },
      `Admin updated Research evaluation status`
    );
  };

  const deleteResearchItem = (id) => {
    setResearchList(prev => (Array.isArray(prev) ? prev : []).filter(item => item.id !== id));
    socketService.emitAdminAction(
      'DELETE_RESEARCH',
      { id },
      `Admin removed a Research Pipeline project`
    );
  };

  const addOpportunityItem = (newItem) => {
    const item = { ...newItem, id: `opp-${Date.now()}` };
    setOpportunitiesList(prev => [item, ...(Array.isArray(prev) ? prev : [])]);
    socketService.emitAdminAction(
      'ADD_OPPORTUNITY',
      item,
      `Admin created Strategic Opportunity: "${item.title}"`
    );
  };

  const updateOpportunityItem = (id, updated) => {
    setOpportunitiesList(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === id ? { ...item, ...updated } : item));
    socketService.emitAdminAction(
      'UPDATE_OPPORTUNITY',
      { id, updated },
      `Admin updated Opportunity details`
    );
  };

  const deleteOpportunityItem = (id) => {
    setOpportunitiesList(prev => (Array.isArray(prev) ? prev : []).filter(item => item.id !== id));
    socketService.emitAdminAction(
      'DELETE_OPPORTUNITY',
      { id },
      `Admin deleted a Strategic Opportunity`
    );
  };

  const addCandidate = (newCand) => {
    const cand = { ...newCand, id: `cand-${Date.now()}` };
    setCandidatesList(prev => [cand, ...(Array.isArray(prev) ? prev : [])]);
    socketService.emitAdminAction(
      'ADD_CANDIDATE',
      cand,
      `Admin added candidate: "${cand.name}" for ${cand.position}`
    );
  };

  const updateCandidateStage = (id, stage, decision = null) => {
    let candidateName = 'Candidate';
    setCandidatesList(prev => (Array.isArray(prev) ? prev : []).map(c => {
      if (c.id === id) {
        candidateName = c.name;
        return {
          ...c,
          stage,
          decision: decision || c.decision
        };
      }
      return c;
    }));

    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, stage, decision: decision || prev.decision }));
    }

    socketService.emitAdminAction(
      'UPDATE_CANDIDATE_STAGE',
      { id, stage, decision },
      `Admin moved candidate ${candidateName} to stage "${stage}"`
    );
  };

  const updateCandidate = (id, updated) => {
    setCandidatesList(prev => (Array.isArray(prev) ? prev : []).map(c => c.id === id ? { ...c, ...updated } : c));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, ...updated }));
    }
    socketService.emitAdminAction(
      'UPDATE_CANDIDATE',
      { id, updated },
      `Admin updated candidate profile details`
    );
  };

  const deleteCandidate = (id) => {
    let candName = 'Candidate';
    const found = (Array.isArray(candidatesList) ? candidatesList : []).find(c => c.id === id);
    if (found) candName = found.name;

    setCandidatesList(prev => (Array.isArray(prev) ? prev : []).filter(c => c.id !== id));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(null);
    }
    socketService.emitAdminAction(
      'DELETE_CANDIDATE',
      { id },
      `Admin deleted candidate "${candName}"`
    );
  };

  const addTask = (newTask) => {
    const item = { ...newTask, id: `tsk-${Date.now()}` };
    setTasksList(prev => [item, ...(Array.isArray(prev) ? prev : [])]);
    socketService.emitAdminAction(
      'ADD_TASK',
      item,
      `Admin created priority task: "${item.task}"`
    );
  };

  const toggleTaskStatus = (id) => {
    let taskTitle = 'Task';
    let nextStatus = 'In Progress';
    setTasksList(prev => (Array.isArray(prev) ? prev : []).map(t => {
      if (t.id === id) {
        taskTitle = t.task;
        nextStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
    socketService.emitAdminAction(
      'TOGGLE_TASK',
      { id, nextStatus },
      `Admin marked task "${taskTitle}" as ${nextStatus}`
    );
  };

  const deleteTask = (id) => {
    setTasksList(prev => (Array.isArray(prev) ? prev : []).filter(t => t.id !== id));
    socketService.emitAdminAction(
      'DELETE_TASK',
      { id },
      `Admin deleted a management task`
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => (Array.isArray(prev) ? prev : []).map(n => ({ ...n, isRead: true })));
  };

  const addTeamMember = (member) => {
    const newMember = { ...member, id: `tm-${Date.now()}`, avatar: member.name.split(' ').map(n=>n[0]).join('').toUpperCase() };
    setTeamData(prev => ({
      ...prev,
      coreMembers: [...(prev.coreMembers || []), newMember],
      stats: { ...(prev.stats || {}), coreCount: (prev.stats?.coreCount || 0) + 1 }
    }));
    socketService.emitAdminAction(
      'ADD_TEAM_MEMBER',
      newMember,
      `Admin added team member: "${newMember.name}" (${newMember.role})`
    );
  };

  const addPosition = (pos) => {
    const newPos = { ...pos, id: `pos-${Date.now()}`, applications: 0, shortlisted: 0, interviews: 0, selected: 0 };
    setPositionsList(prev => [...(Array.isArray(prev) ? prev : []), newPos]);
    socketService.emitAdminAction(
      'ADD_POSITION',
      newPos,
      `Admin opened new talent position: "${newPos.title}"`
    );
  };

  const resetToDefaultData = (broadcast = true) => {
    setKpis(initialKpis);
    setStrategyList(initialStrategy);
    setResearchList(initialResearch);
    setOpportunitiesList(initialOpportunities);
    setFunnelData(initialFunnel);
    setPositionsList(initialPositions);
    setCandidatesList(initialCandidates);
    setTeamData(initialTeam);
    setTasksList(initialTasks);
    setNotifications(initialNotifications);
    try { localStorage.clear(); } catch(e){}

    if (broadcast) {
      socketService.emitAdminAction(
        'RESET_DATA',
        {},
        `Admin restored system to default baseline state`
      );
    }
  };

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadNotifCount = safeNotifications.filter(n => !n.isRead).length;

  return (
    <DashboardContext.Provider value={{
      userRole,
      setUserRole,
      socketConnected,
      presenceStats,
      liveToast,
      dismissLiveToast,
      activeAnnouncement,
      dismissActiveAnnouncement,
      sendLiveAnnouncement,
      clearLiveAnnouncement,
      isBroadcastOpen,
      setIsBroadcastOpen,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      isSearchOpen,
      setIsSearchOpen,
      isNotifOpen,
      setIsNotifOpen,
      selectedCandidate,
      setSelectedCandidate,
      kpis: Array.isArray(kpis) ? kpis : initialKpis,
      strategyList: Array.isArray(strategyList) ? strategyList : initialStrategy,
      researchList: Array.isArray(researchList) ? researchList : initialResearch,
      opportunitiesList: Array.isArray(opportunitiesList) ? opportunitiesList : initialOpportunities,
      funnelData: funnelData || initialFunnel,
      positionsList: Array.isArray(positionsList) ? positionsList : initialPositions,
      candidatesList: Array.isArray(candidatesList) ? candidatesList : initialCandidates,
      teamData: teamData || initialTeam,
      tasksList: Array.isArray(tasksList) ? tasksList : initialTasks,
      notifications: safeNotifications,
      unreadNotifCount,
      addStrategyItem,
      updateStrategyItem,
      deleteStrategyItem,
      addResearchItem,
      updateResearchItem,
      deleteResearchItem,
      addOpportunityItem,
      updateOpportunityItem,
      deleteOpportunityItem,
      addCandidate,
      updateCandidateStage,
      updateCandidate,
      deleteCandidate,
      addTask,
      toggleTaskStatus,
      deleteTask,
      markAllNotificationsRead,
      addTeamMember,
      addPosition,
      resetToDefaultData
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

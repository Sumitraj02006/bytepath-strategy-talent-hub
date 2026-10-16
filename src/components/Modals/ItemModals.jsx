import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Icon } from '../Icons';

export const AddStrategyModal = ({ isOpen, onClose, editItem = null }) => {
  const { addStrategyItem, updateStrategyItem } = useDashboard();
  const [name, setName] = useState(editItem ? editItem.name : '');
  const [description, setDescription] = useState(editItem ? editItem.description : '');
  const [status, setStatus] = useState(editItem ? editItem.status : 'In Progress');
  const [priority, setPriority] = useState(editItem ? editItem.priority : 'High');
  const [owner, setOwner] = useState(editItem ? editItem.owner : 'Mayank Gaur');
  const [deadline, setDeadline] = useState(editItem ? editItem.deadline : '2026-10-30');
  const [progress, setProgress] = useState(editItem ? editItem.progress : 50);
  const [nextAction, setNextAction] = useState(editItem ? editItem.nextAction : '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { name, description, status, priority, owner, deadline, progress: Number(progress), nextAction };
    if (editItem) {
      updateStrategyItem(editItem.id, itemData);
    } else {
      addStrategyItem(itemData);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{editItem ? 'Edit Strategy Initiative' : 'Add Strategy Initiative'}</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Priority Initiative Name</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. College Partnership Program" />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="3" required value={description} onChange={e => setDescription(e.target.value)} placeholder="Detailed strategic scope..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority Level</label>
                <select className="form-control" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Owner</label>
                <input type="text" className="form-control" required value={owner} onChange={e => setOwner(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input type="date" className="form-control" required value={deadline} onChange={e => setDeadline(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Progress ({progress}%)</label>
              <input type="range" min="0" max="100" className="form-control" value={progress} onChange={e => setProgress(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Immediate Next Action</label>
              <input type="text" className="form-control" required value={nextAction} onChange={e => setNextAction(e.target.value)} placeholder="Next concrete action step..." />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Initiative</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddResearchModal = ({ isOpen, onClose, editItem = null }) => {
  const { addResearchItem, updateResearchItem } = useDashboard();
  const [name, setName] = useState(editItem ? editItem.name : '');
  const [category, setCategory] = useState(editItem ? editItem.category : 'Course');
  const [source, setSource] = useState(editItem ? editItem.source : 'Market Survey');
  const [potential, setPotential] = useState(editItem ? editItem.potential : 'High');
  const [status, setStatus] = useState(editItem ? editItem.status : 'Researching');
  const [owner, setOwner] = useState(editItem ? editItem.owner : 'Mayank Gaur');
  const [recommendation, setRecommendation] = useState(editItem ? editItem.recommendation : '');
  const [nextAction, setNextAction] = useState(editItem ? editItem.nextAction : '');
  const [deadline, setDeadline] = useState(editItem ? editItem.deadline : '2026-10-30');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, category, source, potential, status, owner, recommendation, nextAction, deadline };
    if (editItem) {
      updateResearchItem(editItem.id, data);
    } else {
      addResearchItem(data);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{editItem ? 'Edit Research Task' : 'Add Research Task'}</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Research Opportunity Name</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Partnership">Partnership</option>
                  <option value="Course">Course</option>
                  <option value="Internship">Internship</option>
                  <option value="Event">Event</option>
                  <option value="Industry">Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business Growth">Business Growth</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Stage Status</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="New">New</option>
                  <option value="Researching">Researching</option>
                  <option value="Evaluating">Evaluating</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Source</label>
                <input type="text" className="form-control" required value={source} onChange={e => setSource(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Potential</label>
                <select className="form-control" value={potential} onChange={e => setPotential(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Research Owner</label>
              <input type="text" className="form-control" required value={owner} onChange={e => setOwner(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Recommendation</label>
              <input type="text" className="form-control" required value={recommendation} onChange={e => setRecommendation(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Next Action</label>
                <input type="text" className="form-control" required value={nextAction} onChange={e => setNextAction(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input type="date" className="form-control" required value={deadline} onChange={e => setDeadline(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Research Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddOpportunityModal = ({ isOpen, onClose, editItem = null }) => {
  const { addOpportunityItem, updateOpportunityItem } = useDashboard();
  const [name, setName] = useState(editItem ? editItem.name : '');
  const [category, setCategory] = useState(editItem ? editItem.category : 'College Partnerships');
  const [potential, setPotential] = useState(editItem ? editItem.potential : 'High');
  const [priority, setPriority] = useState(editItem ? editItem.priority : 'High');
  const [status, setStatus] = useState(editItem ? editItem.status : 'In Progress');
  const [estimatedImpact, setEstimatedImpact] = useState(editItem ? editItem.estimatedImpact : '');
  const [nextAction, setNextAction] = useState(editItem ? editItem.nextAction : '');
  const [deadline, setDeadline] = useState(editItem ? editItem.deadline : '2026-10-30');
  const [isHighPotential, setIsHighPotential] = useState(editItem ? editItem.isHighPotential : true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, category, potential, priority, status, estimatedImpact, nextAction, deadline, isHighPotential };
    if (editItem) {
      updateOpportunityItem(editItem.id, data);
    } else {
      addOpportunityItem(data);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{editItem ? 'Edit Opportunity' : 'Add Strategic Opportunity'}</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Opportunity Name</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="College Partnerships">College Partnerships</option>
                  <option value="Corporate Partnerships">Corporate Partnerships</option>
                  <option value="Workshops">Workshops</option>
                  <option value="New Courses">New Courses</option>
                  <option value="Internship Programs">Internship Programs</option>
                  <option value="Community Collaborations">Community Collaborations</option>
                  <option value="Technology Opportunities">Technology Opportunities</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-control" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Impact Metric</label>
              <input type="text" className="form-control" required value={estimatedImpact} onChange={e => setEstimatedImpact(e.target.value)} placeholder="e.g. 1,000 student enrollments" />
            </div>

            <div className="form-group">
              <label className="form-label">Next Action</label>
              <input type="text" className="form-control" required value={nextAction} onChange={e => setNextAction(e.target.value)} />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="hp-check" checked={isHighPotential} onChange={e => setIsHighPotential(e.target.checked)} />
              <label htmlFor="hp-check" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Mark as High Potential Opportunity</label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Opportunity</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddCandidateModal = ({ isOpen, onClose }) => {
  const { addCandidate } = useDashboard();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Web Development Intern');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [skillsStr, setSkillsStr] = useState('React, Node.js, Git');
  const [recommendation, setRecommendation] = useState('Recommended for technical interview.');
  const [nextAction, setNextAction] = useState('Schedule Round 1 interview.');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCand = {
      name,
      position,
      email,
      phone,
      college,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'Applied',
      interviewDate: 'To be scheduled',
      interviewScore: 'Pending',
      skills: skillsStr.split(',').map(s => s.trim()),
      recommendation,
      decision: 'Pending',
      nextAction
    };
    addCandidate(newCand);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Add New Candidate</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Candidate Name</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Position Applied</label>
              <select className="form-control" value={position} onChange={e => setPosition(e.target.value)}>
                <option value="Social Media Marketing Intern">Social Media Marketing Intern</option>
                <option value="Content Intern">Content Intern</option>
                <option value="Web Development Intern">Web Development Intern</option>
                <option value="Research Intern">Research Intern</option>
                <option value="Graphic Design Intern">Graphic Design Intern</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" required value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">College / University</label>
              <input type="text" className="form-control" required value={college} onChange={e => setCollege(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Skills (comma separated)</label>
              <input type="text" className="form-control" required value={skillsStr} onChange={e => setSkillsStr(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Candidate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddTaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useDashboard();
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Strategy');
  const [priority, setPriority] = useState('High');
  const [deadline, setDeadline] = useState('2026-10-08');
  const [assigned, setAssigned] = useState('Mayank Gaur');
  const [tabGroup, setTabGroup] = useState('Today');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ task, category, priority, deadline, status: 'To Do', assigned, tabGroup });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Create Command Task</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Task Description</label>
              <input type="text" className="form-control" required value={task} onChange={e => setTask(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Strategy">Strategy</option>
                  <option value="Research">Research</option>
                  <option value="Talent">Talent</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-control" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input type="date" className="form-control" required value={deadline} onChange={e => setDeadline(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Due Section</label>
                <select className="form-control" value={tabGroup} onChange={e => setTabGroup(e.target.value)}>
                  <option value="Today">Today</option>
                  <option value="Upcoming">Upcoming (7 days)</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Person</label>
              <input type="text" className="form-control" required value={assigned} onChange={e => setAssigned(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddMemberModal = ({ isOpen, onClose }) => {
  const { addTeamMember } = useDashboard();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [dept, setDept] = useState('Research');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeamMember({ name, role, dept, email, status: 'Active' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Add Core Team Member</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Member Name</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Role Title</label>
              <input type="text" className="form-control" required value={role} onChange={e => setRole(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-control" required value={dept} onChange={e => setDept(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Member</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddPositionModal = ({ isOpen, onClose }) => {
  const { addPosition } = useDashboard();
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Technology');
  const [status, setStatus] = useState('Open');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosition({ title, department, status });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Post New Open Position</h3>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Position Title</label>
              <input type="text" className="form-control" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. AI Research Intern" />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-control" value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="Technology">Technology</option>
                <option value="Content">Content</option>
                <option value="Marketing">Marketing</option>
                <option value="Research">Research</option>
                <option value="Design">Design</option>
                <option value="Partnerships">Partnerships</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Open">Open</option>
                <option value="In Review">In Review</option>
                <option value="Filled">Filled</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Post Position</button>
          </div>
        </form>
      </div>
    </div>
  );
};

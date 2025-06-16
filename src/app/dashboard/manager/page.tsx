'use client';

import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


import TaskCard from '@/components/TaskCard/TaskCard';
import TaskTrendChart from '@/components/TaskTrendChart/TaskTrendChart';
import useTaskStore, { useHydrateTasks } from '@/store/TaskStore';

import './managerDashboard.css';

export default function ManagerDashboard() {
  useHydrateTasks();
  const { tasks, updateTask, hasHydrated } = useTaskStore();
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleApproveClosure = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status === 'Pending Approval') {
      updateTask({ ...task, status: 'Closed' });
    }
  };

  const handleReopenBug = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status === 'Pending Approval') {
      updateTask({ ...task, status: 'Open' });
    }
  };

  const filteredTasks = tasks
    .filter((t) => (filter === 'All' ? true : t.status === filter))
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.priority.localeCompare(b.priority)
        : b.priority.localeCompare(a.priority)
    );

  const pendingApprovalCount = tasks.filter(t => t.status === 'Pending Approval').length;

  if (!hasHydrated) {
    return <div className="text-center text-gray-400 py-8">Loading tasks...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="background-effects">
        <div className="gradient-blob-1"></div>
        <div className="gradient-blob-2"></div>
      </div>

      <header className="dashboard-header">
        <div className="navbar-left">
          <span className="navbar-logo">🐞</span>
          <span className="navbar-title">BugZen</span>
        </div>
        <div className="navbar-right">
          <span className="navbar-user">👤 Manager</span>
          <button 
            onClick={handleLogout}
            className="ml-4 text-sm text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {pendingApprovalCount > 0 && (
          <div className="pending-approval-container">
            <p className="pending-approval">
              {pendingApprovalCount} bug{pendingApprovalCount > 1 ? 's' : ''} pending your approval
            </p>
          </div>
        )}

        <section className="section" style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">Task Analytics</h2>
          <TaskTrendChart />
        </section>

        <section className="section">
          <h2 className="section-title">Task Management</h2>
          <div className="filters-container">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Filter & Sort</h3>
            <div className="filter-controls">
              <select
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter tasks by status"
              >
                <option value="All">All Tasks</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="Pending Approval">Pending Approval</option>
              </select>

              <select
                className="filter-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                aria-label="Sort tasks by priority"
              >
                <option value="asc">Priority: Low to High</option>
                <option value="desc">Priority: High to Low</option>
              </select>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks available.</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onApproveClosure={handleApproveClosure}
                  onReopenBug={handleReopenBug}
                  isManager={true}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
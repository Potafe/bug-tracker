'use client';

import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react';

import TaskCard, { Task } from '@/components/TaskCard/TaskCard';
import CreateTaskForm from '@/components/TaskForm/CreateTaskForm';
import TaskTrendChart from '@/components/TaskTrendChart/TaskTrendChart';
import useTaskStore, { useHydrateTasks } from '@/store/TaskStore';

import './devDashboard.css';

export default function DevDashboard() {
  useHydrateTasks();
  
  const { tasks, addTask, updateTask, deleteTask, hasHydrated } = useTaskStore();
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const createTaskRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCreate = (newTask: Task) => addTask(newTask);
  const handleEditTask = (updatedTask: Task) => updateTask(updatedTask);
  const handleDeleteTask = (taskId: number) => deleteTask(taskId);
  const handleCloseBug = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) updateTask({ ...task, status: 'Pending Approval' });
  };
  const handleLogTime = (taskId: number, hours: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) updateTask({ ...task, timeSpent: (task.timeSpent || 0) + hours });
  };
  const handleStatusChange = (id: number, newStatus: Task['status']) => {
    const task = tasks.find((t) => t.id === id);
    if (task) updateTask({ ...task, status: newStatus });
  };

  const filteredTasks = tasks
    .filter((t) => (filter === 'All' ? true : t.status === filter))
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.priority.localeCompare(b.priority)
        : b.priority.localeCompare(a.priority)
    );

  if (!hasHydrated) {
    return <div className="text-center text-gray-400 py-8">Loading tasks...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="background-effects" />
      <nav className="navbar" ref={topRef}>
        <div className="navbar-left">
          <span className="navbar-logo">🐞</span>
          <span className="navbar-title">BugZen</span>
        </div>
        <div className="navbar-center">
          <button
            className="navbar-btn"
            onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            Dashboard
          </button>
          <button
            className="navbar-btn"
            onClick={() =>
              document.getElementById('task-management')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Tasks
          </button>
          <button
            className="navbar-btn"
            onClick={() => createTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            + New Task
          </button>
        </div>
        <div className="navbar-right">
          <span className="navbar-user">👤 Developer</span>
          <button 
            onClick={handleLogout}
            className="ml-4 text-sm text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <section className="section" style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">Task Analytics</h2>
          <TaskTrendChart />
        </section>

        <section className="section" id="task-management">
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
              <p>No tasks available. Create your first task below!</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onLogTime={handleLogTime}
                  onStatusChange={handleStatusChange}
                  onCloseBug={handleCloseBug}
                  isManager={false}
                />
              ))}
            </div>
          )}
        </section>

        <section className="section" ref={createTaskRef}>
          <h2 className="section-title">Create New Task</h2>
          <CreateTaskForm onCreate={handleCreate} />
        </section>
      </main>

      <button
        className="scroll-top-btn"
        onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ⬆
      </button>
    </div>
  );
}
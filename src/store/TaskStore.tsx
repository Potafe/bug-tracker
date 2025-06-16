import React from 'react';
import { create } from 'zustand';
import type { Task } from '@/components/TaskCard/TaskCard';

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  hasHydrated: boolean;
}

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  hasHydrated: false,
  setTasks: (tasks) => {
    set({ tasks });
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  },
  addTask: (task) => {
    const updated = [task, ...get().tasks];
    set({ tasks: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updated));
    }
  },
  updateTask: (task) => {
    const updated = get().tasks.map((t) => (t.id === task.id ? task : t));
    set({ tasks: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updated));
    }
  },
  deleteTask: (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);
    set({ tasks: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updated));
    }
  },
}));

export function useHydrateTasks() {
  const setTasks = useTaskStore((s) => s.setTasks);
  const hasHydrated = useTaskStore((s) => s.hasHydrated);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !hasHydrated) {
      const stored = localStorage.getItem('tasks');
      if (stored) setTasks(JSON.parse(stored));
      useTaskStore.setState({ hasHydrated: true });
    }
  }, [setTasks, hasHydrated]);
}

export default useTaskStore;
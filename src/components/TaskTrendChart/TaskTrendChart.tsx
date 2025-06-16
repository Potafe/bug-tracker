'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useTaskStore from '@/store/TaskStore';

export interface TrendData {
  date: string;
  tasks: number;
}

const hardcodedData: TrendData[] = [
  { date: 'Jun 10', tasks: 2 },
  { date: 'Jun 11', tasks: 4 },
  { date: 'Jun 12', tasks: 3 },
  { date: 'Jun 13', tasks: 5 },
  { date: 'Jun 14', tasks: 2 },
  { date: 'Jun 15', tasks: 6 },
];

export default function TaskTrendChart() {
  const { tasks } = useTaskStore();

  const taskCountsByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const todayData = { date: 'Today', tasks: taskCountsByDate[today] || 0 };

  const mergedData = [...hardcodedData, todayData];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 p-6 rounded-lg shadow-lg mb-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Task Trend</h2>
      <p className="text-sm text-white/80 mb-6 relative z-10">
        A visual representation of tasks created over the last 7 days. Hardcoded data combined with live updates for today.
      </p>

      <div className="relative z-10">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis allowDecimals={false} stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="tasks" stroke="#ffffff" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
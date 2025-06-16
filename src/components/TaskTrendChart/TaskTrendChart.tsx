'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export interface TrendData {
    date: string;
    tasks: number;
}

interface TaskTrendChartProps {
    data?: TrendData[];
}

const defaultData: TrendData[] = [
    { date: 'Jun 10', tasks: 2 },
    { date: 'Jun 11', tasks: 4 },
    { date: 'Jun 12', tasks: 3 },
    { date: 'Jun 13', tasks: 5 },
    { date: 'Jun 14', tasks: 2 },
    { date: 'Jun 15', tasks: 6 },
];

export default function TaskTrendChart({ data = defaultData }: TaskTrendChartProps) {
    return (
        <div className="bg-black/50 p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-2">Task Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis allowDecimals={false} stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} itemStyle={{ color: '#fff' }}/>
                    <Line type="monotone" dataKey="tasks" stroke="#a855f7" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

'use client';

import { useState } from 'react';
import './CreateTaskForm.css';

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Closed' | 'Pending Approval';
    assignee: string;
    dueDate: string;
    stepsToReproduce: string;
    environment: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    createdAt: string;
}

interface CreateTaskFormProps {
    onCreate: (task: Task) => void;
}

const CreateTaskForm = ({ onCreate }: CreateTaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');
    const [status, setStatus] = useState<'Open' | 'In Progress' | 'Closed' | 'Pending Approval'>('Open');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [stepsToReproduce, setStepsToReproduce] = useState('');
    const [environment, setEnvironment] = useState('');
    const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            priority,
            status,
            assignee,
            dueDate,
            stepsToReproduce,
            environment,
            severity,
            createdAt: new Date().toISOString(),
        };
        onCreate(newTask);
        setTitle('');
        setDescription('');
        setPriority('Low');
        setStatus('Open');
        setAssignee('');
        setDueDate('');
        setStepsToReproduce('');
        setEnvironment('');
        setSeverity('Low');
    };

    return (
        <form className="create-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">
                    Title<span className="required">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">
                    Description<span className="required">*</span>
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value as 'Low' | 'Medium' | 'High' | 'Critical')
                        }
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value as 'Open' | 'In Progress' | 'Closed' | 'Pending Approval'
                            )
                        }
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                        <option value="Pending Approval">Pending Approval</option>
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="assignee">Assignee</label>
                    <input
                        id="assignee"
                        type="text"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="stepsToReproduce">Steps to Reproduce</label>
                <textarea
                    id="stepsToReproduce"
                    value={stepsToReproduce}
                    onChange={(e) => setStepsToReproduce(e.target.value)}
                ></textarea>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="environment">Environment</label>
                    <input
                        id="environment"
                        type="text"
                        value={environment}
                        onChange={(e) => setEnvironment(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="severity">Severity</label>
                    <select
                        id="severity"
                        value={severity}
                        onChange={(e) =>
                            setSeverity(e.target.value as 'Low' | 'Medium' | 'High' | 'Critical')
                        }
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="submit-button">
                Create Task
            </button>
        </form>
    );
};

export default CreateTaskForm;
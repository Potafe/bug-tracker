'use client';

import React, { useState } from 'react';

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Closed' | 'Pending Approval';
  assignee: string;
  dueDate: string;
  stepsToReproduce?: string;
  environment?: string;
  severity?: 'Low' | 'Medium' | 'High' | 'Critical';
  createdAt: string;
  timeSpent?: number;
};

interface Props {
  task: Task;
  onEdit?: (updatedTask: Task) => void;
  onDelete?: (taskId: number) => void;
  onLogTime?: (taskId: number, hours: number) => void;
  onStatusChange?: (id: number, newStatus: Task['status']) => void;
  onCloseBug?: (taskId: number) => void;
  onApproveClosure?: (taskId: number) => void;
  onReopenBug?: (taskId: number) => void;
  isManager?: boolean;
}

const statusColors: Record<Task['status'], string> = {
  'Open': 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-purple-100 text-purple-700',
  'Closed': 'bg-green-100 text-green-700',
  'Pending Approval': 'bg-yellow-100 text-yellow-800',
};

const priorityColors: Record<Task['priority'], string> = {
  'Low': 'bg-green-200 text-green-800',
  'Medium': 'bg-yellow-200 text-yellow-800',
  'High': 'bg-orange-200 text-orange-800',
  'Critical': 'bg-red-200 text-red-800',
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onLogTime,
  onStatusChange,
  onCloseBug,
  onApproveClosure,
  onReopenBug,
  isManager,
}: Props) {
  const [logHours, setLogHours] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  const getDisplayStatus = (status: Task['status']) => {
    if (!isManager && status === 'Pending Approval') {
      return 'Closed (Pending)';
    }
    return status;
  };

  const handleStatusChange = (id: number, newStatus: Task['status']) => {
    if (!isManager && newStatus === 'Closed') {
      onStatusChange?.(id, 'Pending Approval');
    } else {
      onStatusChange?.(id, newStatus);
    }
  };

 return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-purple-300">{task.title}</h3>
          <p className="text-sm text-gray-300 mb-1">{task.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[task.status]}`}>
            {getDisplayStatus(task.status)}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        <span><b>Assignee:</b> {task.assignee || <span className="italic text-gray-500">Unassigned</span>}</span>
        <span><b>Due:</b> {task.dueDate || <span className="italic text-gray-500">N/A</span>}</span>
        <span><b>Created:</b> {new Date(task.createdAt).toLocaleDateString()}</span>
        {task.timeSpent !== undefined && (
          <span><b>Time Spent:</b> {task.timeSpent}h</span>
        )}
        {task.severity && (
          <span><b>Severity:</b> {task.severity}</span>
        )}
      </div>

      {(task.stepsToReproduce || task.environment) && (
        <div className="bg-gray-800 rounded p-2 text-xs text-gray-300">
          {task.stepsToReproduce && (
            <div>
              <b>Steps:</b> {task.stepsToReproduce}
            </div>
          )}
          {task.environment && (
            <div>
              <b>Env:</b> {task.environment}
            </div>
          )}
        </div>
      )}

      {onLogTime && (
        <form
          className="flex gap-2 items-center"
          onSubmit={e => {
            e.preventDefault();
            if (logHours && !isNaN(Number(logHours))) {
              onLogTime(task.id, Number(logHours));
              setLogHours('');
            }
          }}
        >
          <input
            type="number"
            min={0}
            step={0.5}
            placeholder="Hours"
            className="border border-gray-700 bg-gray-800 px-2 py-1 w-20 rounded text-sm text-white"
            value={logHours}
            onChange={e => setLogHours(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded"
          >
            Log Time
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {!isManager && task.status === 'Open' && onCloseBug && (
          <button
            onClick={() => onCloseBug(task.id)}
            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded"
          >
            Mark as Complete
          </button>
        )}

        {isManager && task.status === 'Pending Approval' && (
          <>
            <button
              onClick={() => onApproveClosure?.(task.id)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
            >
              Approve
            </button>
            <button
              onClick={() => onReopenBug?.(task.id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
            >
              Reopen
            </button>
          </>
        )}
        
        {onStatusChange && (
          <select
            className="bg-gray-800 border border-gray-700 text-xs text-white px-2 py-1 rounded"
            value={
              !isManager && task.status === 'Pending Approval' ? 'Closed' : task.status
            }
            onChange={e => handleStatusChange(task.id, e.target.value as Task['status'])}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            {isManager && <option value="Pending Approval">Pending Approval</option>}
            <option value="Closed">Closed</option>
          </select>
        )}

        {onEdit && (
          <>
            {isEditing ? (
              <div className="mt-3 border-t border-gray-700 pt-3">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Edit Task</h4>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                  className="w-full mb-2 bg-gray-800 border border-gray-700 p-2 rounded text-white text-sm"
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                  className="w-full mb-2 bg-gray-800 border border-gray-700 p-2 rounded text-white text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onEdit(editedTask);
                      setIsEditing(false);
                    }}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedTask(task); 
                    }}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
              >
                Edit
              </button>
            )}
          </>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white text-xs rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
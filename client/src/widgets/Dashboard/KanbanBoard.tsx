'use client';

import React, { useState } from 'react';
import { Task } from '@/shared/types';
import { Button } from "@/shared/components/ui/button";
import { Circle, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface KanbanBoardProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onUpdateStatus: (taskId: string, newStatus: Task["status"]) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskClick, onUpdateStatus }) => {
    const [draggedTask, setDraggedTask] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
    const [updatingTasks, setUpdatingTasks] = useState<Set<string>>(new Set());
    const [optimisticTasks, setOptimisticTasks] = useState<Task[]>(tasks);

    const columns = [
        { id: 'todo', title: 'To Do', icon: Circle, color: 'text-gray-500' },
        { id: 'in_progress', title: 'In Progress', icon: Clock, color: 'text-blue-500' },
        { id: 'review', title: 'Review', icon: AlertCircle, color: 'text-yellow-500' },
        { id: 'done', title: 'Done', icon: CheckCircle, color: 'text-green-500' }
    ] as const;

    // Sync optimistic tasks with actual tasks, but preserve optimistic changes
    React.useEffect(() => {
        setOptimisticTasks(prev => {
            // If we have optimistic updates, don't overwrite them
            const hasOptimisticChanges = updatingTasks.size > 0;
            if (!hasOptimisticChanges) {
                return tasks;
            }
            return prev; // Keep current optimistic state
        });
    }, [tasks]);

    const handleOptimisticUpdate = (taskId: string, newStatus: Task["status"]) => {
        // Update UI immediately
        setOptimisticTasks(prev => 
            prev.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
        
        // Add to updating set for loading state
        setUpdatingTasks(prev => new Set(prev).add(taskId));
        
        // Call actual update
        onUpdateStatus(taskId, newStatus);
        
        // Remove from updating set after successful response (longer delay to account for server round trip)
        setTimeout(() => {
            setUpdatingTasks(prev => {
                const newSet = new Set(prev);
                newSet.delete(taskId);
                return newSet;
            });
        }, 2000);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        setDraggedTask(taskId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverColumn(columnId);
    };

    const handleDragLeave = () => {
        setDragOverColumn(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
        e.preventDefault();
        setDragOverColumn(null);
        
        if (draggedTask) {
            console.log('Dropping task:', draggedTask, 'to column:', columnId);
            handleOptimisticUpdate(draggedTask, columnId as Task["status"]);
            setDraggedTask(null);
        }
    };

    return (
        <div className="grid md:grid-cols-4 gap-6 overflow-x-auto pb-4">
            {columns.map((col) => (
                <div key={col.id} className="min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <col.icon className={`w-5 h-5 ${col.color}`} />
                            <h3 className="font-bold text-gray-700">{col.title}</h3>
                            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                {optimisticTasks?.filter(t => t.status === col.id).length || 0}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`space-y-3 rounded-lg p-2 ${optimisticTasks?.filter(t => t.status === col.id).length > 0 ? 'min-h-[400px]' : ''} transition-colors ${
                            dragOverColumn === col.id
                                ? 'bg-blue-50 border-2 border-dashed border-blue-400'
                                : 'bg-gray-50'
                        }`}
                        onDragOver={(e: any) => handleDragOver(e, col.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e: any) => handleDrop(e, col.id)}
                    >
                        {optimisticTasks?.filter(t => t.status === col.id).map((task, index) => (
                            <motion.div
                                key={task.id}
                                layoutId={task.id}
                                draggable
                                onDragStart={(e: any) => handleDragStart(e, task.id)}
                                onClick={() => onTaskClick(task)}
                                className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-move group ${
                                    draggedTask === task.id
                                        ? 'opacity-50 ring-2 ring-blue-400'
                                        : ''
                                } ${
                                    updatingTasks.has(task.id)
                                        ? 'animate-pulse ring-2 ring-green-400'
                                        : ''
                                }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                                        task.priority === 'high'
                                            ? 'bg-red-50 text-red-600'
                                            : task.priority === 'medium'
                                            ? 'bg-yellow-50 text-yellow-600'
                                            : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-[#1a1a2e] mb-2">{task.title}</h4>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex -space-x-2">
                                        <img
                                            src={
                                                task.assignee?.avatar_url ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    task.assignee?.full_name || 'Unassigned'
                                                )}&background=random`
                                            }
                                            className="w-6 h-6 rounded-full border-2 border-white"
                                            alt="Assignee"
                                        />
                                    </div>
                                    <div className="text-xs text-gray-400 font-medium">
                                        {task.due_date
                                            ? new Date(task.due_date).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                            })
                                            : ''}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {col.id !== 'todo' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 text-xs px-3 flex items-center gap-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const prevColumnIndex =
                                                    columns.findIndex(c => c.id === col.id) - 1;
                                                console.log('Button click - Moving task:', task.id, 'to:', columns[prevColumnIndex].id);
                                                handleOptimisticUpdate(task.id, columns[prevColumnIndex].id);
                                            }}
                                        >
                                            ← {columns[columns.findIndex(c => c.id === col.id) - 1].title}
                                        </Button>
                                    )}
                                    {col.id !== 'done' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 text-xs px-3 flex items-center gap-1 ml-auto"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const nextColumnIndex =
                                                    columns.findIndex(c => c.id === col.id) + 1;
                                                console.log('Button click - Moving task:', task.id, 'to:', columns[nextColumnIndex].id);
                                                handleOptimisticUpdate(task.id, columns[nextColumnIndex].id);
                                            }}
                                        >
                                            {columns[columns.findIndex(c => c.id === col.id) + 1].title} →
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;

"use client";

import { LayoutGrid, List } from "lucide-react";
import TaskListView from "./TaskListView";
import KanbanBoard from "./KanbanBoard";
import { useState } from "react";
import { Task } from "@/shared/types";

interface TasksViewProps {
  setSelectedTask: (task: Task | null) => void;
  setIsTaskModalOpen: (open: boolean) => void;
  tasks: Task[];
  onUpdateTask: (id: string, status: Task["status"]) => void;
}

export const TasksView = ({
  setSelectedTask,
  setIsTaskModalOpen,
  tasks,
  onUpdateTask,
}: TasksViewProps) => {
  const [taskViewMode, setTaskViewMode] = useState<"board" | "list">("board");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">My Assigned Tasks</h1>
        <div className="bg-white p-1 rounded-xl flex items-center gap-1 border border-gray-200">
          <button
            onClick={() => setTaskViewMode("board")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              taskViewMode === "board"
                ? "bg-blue-50 text-[#204ecf]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Board
          </button>
          <button
            onClick={() => setTaskViewMode("list")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              taskViewMode === "list"
                ? "bg-blue-50 text-[#204ecf]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List
          </button>
        </div>
      </div>
      {taskViewMode === "board" ? (
        <KanbanBoard
          tasks={tasks || []}
          onTaskClick={(task) => {
            setSelectedTask(task);
            setIsTaskModalOpen(true);
          }}
          onUpdateStatus={onUpdateTask}
        />
      ) : (
        <TaskListView
          tasks={tasks || []}
          onTaskClick={(task) => {
            setSelectedTask(task);
            setIsTaskModalOpen(true);
          }}
        />
      )}
    </div>
  );
};

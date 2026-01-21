/* eslint-disable @next/next/no-img-element */
import { Project } from "@/shared/types";
import { CheckCircle, DollarSign, Star, Users } from "lucide-react";

interface OverviewTabProps {
    project: Project;
    isClientOrAdmin: boolean;
}

export const ProjectOverviewTab = ({ project,isClientOrAdmin}:OverviewTabProps ) => (
  
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Project Progress</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-[#1a1a2e]">{project.progress || 0}%</span>
                        <span className="text-sm text-gray-400">completed</span>
                    </div>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${project.progress || 0}%` }} />
                    </div>
                </div>

                {isClientOrAdmin && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Budget Usage</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[#1a1a2e]">${project.budget_spent?.toLocaleString() || 0}</span>
                            <span className="text-sm text-gray-400">of ${project.total_budget?.toLocaleString() || 0}</span>
                        </div>
                        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((project.budget_spent || 0) / (project.total_budget || 1)) * 100}%` }} />
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Assigned To</span>
                    </div>
                    {project.assigned_to ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={project.assigned_to.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.assigned_to.name)}&background=random`}
                                    alt={project.assigned_to.name}
                                    className="w-10 h-10 rounded-xl border border-gray-100 object-cover"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-[#1a1a2e]">{project.assigned_to.name}</span>
                                    <span className="text-xs text-[#204ecf] font-bold uppercase">{project.assigned_to.type}</span>
                                </div>
                            </div>

                            {/* Team Members Avatars */}
                            {project.team_members && project.team_members.length > 0 && (
                                <div className="flex -space-x-2 pl-2">
                                    {project.team_members.slice(0, 5).map((member) => (
                                        <img
                                            key={member.id}
                                            src={member.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=random`}
                                            alt={member.full_name}
                                            title={member.full_name}
                                            className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100"
                                        />
                                    ))}
                                    {project.team_members.length > 5 && (
                                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                                            +{project.team_members.length - 5}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-sm font-medium text-gray-400 italic">No assigned entity</div>
                    )}
                </div>
            </div>

            {/* Client Review Section */}
            {project.status === 'completed' && project.clientReview && (
                <div className="bg-linear-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#204ecf] rounded-2xl shadow-lg shadow-blue-100">
                                <Star className="w-6 h-6 text-white fill-current" />
                            </div>
                            <h3 className="font-bold text-xl text-gray-900">Client Feedback</h3>
                        </div>
                        <div className="flex gap-1 bg-white/50 p-1.5 rounded-full border border-blue-50">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={`w-5 h-5 ${s <= (project.clientRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="text-5xl text-[#204ecf]/10 absolute -left-2 -top-4 font-serif">&quot;</div>
                        <blockquote className="text-lg text-gray-700 leading-relaxed italic px-6 py-2">
                            {project.clientReview}
                        </blockquote>
                        <div className="text-5xl text-[#204ecf]/10 absolute -right-2 -bottom-4 font-serif">&quot;</div>
                    </div>
                </div>
            )}

            {/* Recent Activity (Mock) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-lg text-[#1a1a2e] mb-6">Recent Activity</h3>
                <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-800">
                                    <span className="font-bold">Michael Torres</span> completed the task <span className="font-medium text-[#204ecf]">Homepage Design</span>
                                </p>
                                <span className="text-xs text-gray-400">2 hours ago</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
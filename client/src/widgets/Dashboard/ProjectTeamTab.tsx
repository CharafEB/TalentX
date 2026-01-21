/* eslint-disable @next/next/no-img-element */
import { talentXApi } from "@/shared/api/talentXApi";
import { Button } from "@/shared/components/ui/button";
import { Briefcase, DollarSign, MessageSquare, Star } from "lucide-react";
import { Project } from '@/shared/types';
import { toast } from 'sonner';
import { ProjectDetailTab } from "@/entities/project/model/types";

interface TeamTabProps {
    project: Project;
    setActiveTab:(tab:ProjectDetailTab) => void;
    isClientOrAdmin: boolean;
}

export const ProjectTeamTab = ({project , setActiveTab ,isClientOrAdmin }:TeamTabProps) => (
        <div className="space-y-8">
            {/* Primary Assignee */}
            {project.assigned_to && (
                <div className="bg-linear-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-[#1a1a2e] flex items-center gap-2">
                            Primary Engagement: <span className="text-[#204ecf] capitalize">{project.assigned_to.type}</span>
                        </h3>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab('overview')}>
                            Engagement Terms
                        </Button>
                    </div>
                    <div className="flex items-center gap-6">
                        <img
                            src={project.assigned_to.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.assigned_to.name)}&background=random`}
                            alt={project.assigned_to.name}
                            className="w-20 h-20 rounded-2xl shadow-md border-4 border-white object-cover"
                        />
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-[#1a1a2e]">{project.assigned_to.name}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 5.0 Rating
                                </span>
                                <span className="flex items-center gap-1 capitalize">
                                    <Briefcase className="w-4 h-4 text-gray-400" /> {project.assigned_to.type} Partner
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button className="bg-[#204ecf] hover:bg-[#1a3da8] text-white rounded-xl">
                                <MessageSquare className="w-4 h-4 mr-2" /> Message
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {project.team_members?.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <img
                            src={member.avatar_url || `https://ui-avatars.com/api/?name=${member.full_name}`}
                            alt={member.full_name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-[#1a1a2e]">{member.full_name}</h3>
                                {member.rateAmount && (
                                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold">
                                        ${member.rateAmount}/{member.rateType === 'hourly' ? 'hr' : 'mo'}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                        </div>
                        <div className="flex gap-2">
                            {isClientOrAdmin && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden sm:flex gap-1 items-center hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
                                    onClick={async () => {
                                        try {
                                            await talentXApi.entities.Project.recordPayment({
                                                projectId: project.id,
                                                talentId: member.id,
                                                amount: member.rateType === 'monthly' ? (member.rateAmount || 0) : (member.rateAmount || 0) * 160
                                            });
                                            toast.success(`Payment notification sent for ${member.full_name}`);
                                        } catch (error) {
                                            toast.error(`${error}: Failed to send payment notification`);
                                        }
                                    }}
                                >
                                    <DollarSign className="w-3 h-3" /> Pay
                                </Button>
                            )}
                            <Button variant="outline" size="icon">
                                <MessageSquare className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
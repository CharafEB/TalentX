import { Button } from "@/shared/components/ui/button";
import { Project } from "@/shared/types";
import { ImageIcon } from "lucide-react";

interface DesignTabProps {
    project: Project;
    isClientOrAdmin: boolean;
}

/* eslint-disable @next/next/no-img-element */
 export const ProjectDesignTab = ({project, isClientOrAdmin}:DesignTabProps) => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-[#1a1a2e] mb-4">System Design Diagram</h3>
                {project.design_diagram_url ? (
                    <div className="relative group">
                        <img src={project.design_diagram_url} alt="Design Diagram" className="w-full rounded-xl border border-gray-100" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                            <Button variant="secondary">Change Diagram</Button>
                        </div>
                    </div>
                ) : (
                    isClientOrAdmin ? (
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-[#204ecf] transition-colors cursor-pointer">
                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-sm text-gray-500 font-medium">Upload System Design Diagram</p>
                            <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, SVG</p>
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-400 italic bg-gray-50 rounded-2xl border border-gray-100">
                            No diagram uploaded
                        </div>
                    )
                )}
            </div>
        </div>
    );
import { Button } from "@/shared/components/ui/button";
import { Project} from "@/shared/types";
import { UseMutationResult } from "@tanstack/react-query";
import { Save, Upload } from "lucide-react";
import { useState } from "react";

interface SRSTabProps {
    isClientOrAdmin: boolean;
    project: Project;
    updateProjectMutation: UseMutationResult<
        Project,                 
        Error,
        Partial<Project>,
        unknown
    >;
}

export const ProjectSRSTab = ({isClientOrAdmin,project ,updateProjectMutation } :SRSTabProps) => {
    const [srsContent, setSrsContent] = useState(project.srs_content || '');
      const handleSaveSrs = () => {
        updateProjectMutation.mutate({ srs_content: srsContent });
    };
    return(
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#1a1a2e]">Software Requirements Specification (SRS)</h3>
                    {isClientOrAdmin && (
                        <Button
                            onClick={handleSaveSrs}
                            disabled={updateProjectMutation.isPending}
                            className="bg-[#204ecf] hover:bg-[#1a3da8] text-white"
                        >
                            <Save className="w-4 h-4 mr-2" /> Save SRS
                        </Button>
                    )}
                </div>
                <textarea
                    rows={15}
                    value={srsContent}
                    onChange={(e) => setSrsContent(e.target.value)}
                    disabled={!isClientOrAdmin}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#204ecf] focus:border-transparent outline-none transition-all resize-none font-mono text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Write your project requirements here..."
                />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-[#1a1a2e] mb-4">Upload SRS File</h3>
                {isClientOrAdmin ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#204ecf] transition-colors cursor-pointer">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop SRS document (PDF, DOCX)</p>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-400 italic bg-gray-50 rounded-2xl border border-gray-100">
                        Read-only access to SRS
                    </div>
                )}
            </div>
        </div>
    );
};
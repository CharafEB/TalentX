import { Button } from "@/shared/components/ui/button";
import { Project } from "@/shared/types";
import { UseMutationResult } from "@tanstack/react-query";
import { Monitor, Save } from "lucide-react";
import { useState } from "react";

interface ProjectWhiteboardTabProps {
    isClientOrAdmin: boolean;
    project: Project;
    updateProjectMutation: UseMutationResult<
        Project,                
        Error,
        Partial<Project>,
        unknown
    >;
}

export const ProjectWhiteboardTab = ({isClientOrAdmin ,project ,updateProjectMutation}:ProjectWhiteboardTabProps) => {
    const [whiteboardUrl, setWhiteboardUrl] = useState(project.whiteboard_url || '');

    const handleSaveWhiteboard = () => {
        updateProjectMutation.mutate({ whiteboard_url: whiteboardUrl });
    };
    return(
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#1a1a2e]">Interactive Whiteboard</h3>
                    {isClientOrAdmin && (
                        <Button
                            onClick={handleSaveWhiteboard}
                            disabled={updateProjectMutation.isPending}
                            className="bg-[#204ecf] hover:bg-[#1a3da8] text-white"
                        >
                            <Save className="w-4 h-4 mr-2" /> Save Link
                        </Button>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Whiteboard URL (e.g. Miro, Excalidraw)</label>
                    <input
                        type="url"
                        value={whiteboardUrl}
                        onChange={(e) => setWhiteboardUrl(e.target.value)}
                        disabled={!isClientOrAdmin}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#204ecf] focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="https://miro.com/app/board/..."
                    />
                </div>
                <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center p-8">
                    <Monitor className="w-16 h-16 text-gray-300 mb-4" />
                    <h4 className="text-xl font-bold text-gray-700 mb-2">Presentation Mode</h4>
                    <p className="text-gray-500 max-w-md mb-6">Use this space to present your ideas to the core team. You can link an external whiteboard or use our built-in tools.</p>
                    {whiteboardUrl ? (
                        <Button className="bg-[#204ecf] hover:bg-[#1a3da8] text-white px-8" onClick={() => window.open(whiteboardUrl, '_blank')}>
                            Launch Whiteboard
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>No Whiteboard Linked</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
import { Project, User } from "@/shared/types";
import ProjectDetail from "./ProjectDetail";

interface ProjectsViewProps {
  user: User;
  selectedProject: string | null;
  setSelectedProject: (projectId: string | null) => void;
  projects: Project[];
}

export const ProjectsView = ({
  user,
  selectedProject,
  setSelectedProject,
  projects,
}: ProjectsViewProps) => {
  const selectedProjectData = projects?.find((p) => p.id === selectedProject);
  return (
    <>
      {!selectedProject ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 font-bold text-lg">
                    {project.name.charAt(0)}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        selectedProjectData && (
          <ProjectDetail
            user={user}
            project={selectedProjectData}
            onBack={() => setSelectedProject(null)}
          />
        )
      )}
    </>
  );
};

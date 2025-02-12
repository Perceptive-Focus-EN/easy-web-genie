
export interface ProjectInfo {
  name: string;
  owner: string;
  createdAt: string;
  techStack: string;
}

export interface ProjectVisibility {
  isPublic: boolean;
  description: string;
}

export interface ProjectSettings {
  projectInfo: ProjectInfo;
  visibility: ProjectVisibility;
}

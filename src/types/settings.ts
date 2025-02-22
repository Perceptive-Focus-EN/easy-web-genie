
export type TechStack = 'vite_react_shadcn_ts' | 'vite_react_ts';

export interface ProjectInfo {
  name: string;
  owner: string;
  createdAt: string; // ISO 8601 format
  techStack: TechStack;
}

export type VisibilityStatus = 'public' | 'private';

export interface ProjectVisibility {
  isPublic: boolean;
  description: string;
  status: VisibilityStatus;
}

export interface ProjectSettings {
  projectInfo: ProjectInfo;
  visibility: ProjectVisibility;
}

export type ProjectSettingsAction = 
  | { type: 'UPDATE_PROJECT_INFO'; payload: Partial<ProjectInfo> }
  | { type: 'UPDATE_VISIBILITY'; payload: ProjectVisibility }
  | { type: 'DELETE_PROJECT' };

export type ToastVariant = "default" | "destructive";

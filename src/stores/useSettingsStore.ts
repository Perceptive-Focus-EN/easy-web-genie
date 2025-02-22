
import { create } from 'zustand';
import { ProjectSettings, ProjectInfo, ProjectVisibility } from '@/types/settings';

interface SettingsState {
  settings: ProjectSettings;
}

interface SettingsActions {
  updateProjectInfo: (info: Partial<ProjectInfo>) => void;
  updateVisibility: (visibility: ProjectVisibility) => void;
  deleteProject: () => Promise<void>;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    projectInfo: {
      name: 'easy-web-genius',
      owner: '@mtwjLwFUX6Ty9iy1VWUskSdohkE2',
      createdAt: '2025-02-10 12:57:49',
      techStack: 'vite_react_shadcn_ts',
    },
    visibility: {
      isPublic: true,
      status: 'public',
      description: 'Anyone can view and remix from your profile.',
    },
  },
  updateProjectInfo: (info) =>
    set((state) => ({
      settings: {
        ...state.settings,
        projectInfo: { ...state.settings.projectInfo, ...info },
      },
    })),
  updateVisibility: (visibility) =>
    set((state) => ({
      settings: { ...state.settings, visibility },
    })),
  deleteProject: async () => {
    try {
      // Here you would typically make an API call to delete the project
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      // Reset the store or handle navigation after successful deletion
    } catch (error) {
      throw new Error('Failed to delete project');
    }
  },
}));

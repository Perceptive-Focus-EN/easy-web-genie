
import { create } from 'zustand';
import { ProjectSettings } from '@/types/settings';

interface SettingsStore {
  settings: ProjectSettings;
  updateProjectInfo: (info: Partial<ProjectSettings['projectInfo']>) => void;
  updateVisibility: (visibility: ProjectSettings['visibility']) => void;
}

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
}));

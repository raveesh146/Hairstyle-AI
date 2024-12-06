import { create } from 'zustand';
import type { Hairstyle, UserPhoto } from '../types';

interface AppState {
  userPhoto: UserPhoto | null;
  selectedHairstyle: Hairstyle | null;
  setUserPhoto: (photo: UserPhoto | null) => void;
  setSelectedHairstyle: (hairstyle: Hairstyle | null) => void;
}

export const useStore = create<AppState>((set) => ({
  userPhoto: null,
  selectedHairstyle: null,
  setUserPhoto: (photo) => set({ userPhoto: photo }),
  setSelectedHairstyle: (hairstyle) => set({ selectedHairstyle: hairstyle }),
}));
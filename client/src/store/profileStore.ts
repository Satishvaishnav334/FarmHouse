import { themeType, User } from "@/lib/types";
import { create } from "zustand";

interface ProfileState {
  profile: User;
  setProfile: (profile: User) => void;
  updateProfile: (updatedProfile: User) => void;
  removeProfile: () => void;
  setTheme: (theme: themeType) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    _id: "",
    username: "",
    email: "",
    fullName: "",
    avatar: "",
    theme: "light",
    createdAt: "",
    updatedAt: "",
    _v: 0,
  },
  setProfile: (profile) => set({ profile }),
  updateProfile: (updatedProfile) =>
    set((state) => ({
      profile: { ...state.profile, ...updatedProfile },
    })),
  removeProfile: () =>
    set({
      profile: {
        _id: "",
        username: "",
        email: "",
        fullName: "",
        theme: "light",
        avatar: "",
        createdAt: "",
        updatedAt: "",
        _v: 0,
      },
    }),
  setTheme: (theme) =>
    set((state) => ({
      profile: { ...state.profile, theme },
    })),
}));

export default useProfileStore;
export type { User };

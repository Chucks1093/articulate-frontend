import { create } from "zustand";

// Profile type definition
export interface Profile {
	id: string;
	email: string;
	username: string;
	avatar?: string;
	authenticated: boolean;
	// Add other profile properties as needed
}

// Simple profile store
interface ProfileStore {
	profile: Profile | null;
	setProfile: (profile: Profile) => void;
	clearProfile: () => void;
}

// Create the Zustand store
export const useProfileStore = create<ProfileStore>((set) => ({
	profile: null,

	setProfile: (profile: Profile) => {
		set({ profile });
	},

	clearProfile: () => {
		set({ profile: null });
	},
}));

import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface KaraokeState {
    isPlaying: boolean;
}

interface Actions {
    setIsPlaying: (value: boolean) => void;
}

const storeAPI: StateCreator<KaraokeState & Actions, [["zustand/devtools", never]]> = (set) =>({
    isPlaying: false,
    
    setIsPlaying: (value) => set(({
        isPlaying: value
    }), false, 'setIsPlaying' ),

});

export const useKaraokeStore = create<KaraokeState & Actions>()(
    devtools(storeAPI, { name: "tab-store" }),
);
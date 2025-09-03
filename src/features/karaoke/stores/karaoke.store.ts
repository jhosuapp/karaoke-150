import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ResponseAudio } from "../interfaces";

interface KaraokeState {
    isPlaying: boolean;
    responseAudio: ResponseAudio | null;
}

interface Actions {
    setIsPlaying: (value: boolean) => void;
    setResponseAudio: (value: ResponseAudio) => void;
}

const storeAPI: StateCreator<KaraokeState & Actions, [["zustand/devtools", never]]> = (set) =>({
    isPlaying: false,
    responseAudio: null,

    setIsPlaying: (value) => set(({
        isPlaying: value
    }), false, 'setIsPlaying' ),
    setResponseAudio: (value) => set(({
        responseAudio: value
    }), false, 'setResponseAudio' ),
});

export const useKaraokeStore = create<KaraokeState & Actions>()(
    devtools(storeAPI, { name: "karaoke-store" }),
);
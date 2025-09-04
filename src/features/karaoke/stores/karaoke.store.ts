import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GetResponseAudioInterface, GetVideoResponseInterface } from "../interfaces";

interface KaraokeState {
    isPlaying: boolean;
    responseAudio: GetResponseAudioInterface | null;
    responseProcessVideo: GetVideoResponseInterface | null;
}

interface Actions {
    setIsPlaying: (value: boolean) => void;
    setResponseAudio: (value: GetResponseAudioInterface) => void;
    setResponseProcessVideo: (value: GetVideoResponseInterface) => void;
}

const storeAPI: StateCreator<KaraokeState & Actions, [["zustand/devtools", never]]> = (set) =>({
    isPlaying: false,
    responseAudio: null,
    responseProcessVideo: null,

    setIsPlaying: (value) => set(({
        isPlaying: value
    }), false, 'setIsPlaying' ),
    setResponseAudio: (value) => set(({
        responseAudio: value
    }), false, 'setResponseAudio' ),
    setResponseProcessVideo: (value) => set(({
        responseProcessVideo: value
    }), false, 'setResponseProcessVideo' ),
});

export const useKaraokeStore = create<KaraokeState & Actions>()(
    persist(
        devtools(storeAPI, { name: "karaoke-store" }),
        {
            name: "karaoke-store",
            partialize: (state) => ({
                responseAudio: state.responseAudio,
                responseProcessVideo: state.responseProcessVideo,
            }),
        }
    )
);
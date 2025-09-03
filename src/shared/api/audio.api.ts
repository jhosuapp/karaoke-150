import axios from "axios";

const audioApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_AUDIO_URL}/karaoke/api/`,
    headers: {
        Authorization: `Token ${import.meta.env.VITE_TOKEN_AUDIO}`,
        redirect: "follow"
    },
});

export { audioApi }
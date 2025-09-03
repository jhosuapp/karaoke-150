import axios from "axios";

const videoApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_VIDEO_URL}`,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_TOKEN_VIDEO
    },
});

export { videoApi }
import axios from "axios";

const audioApi = axios.create({
    baseURL: "https://datadots.desarrollopr.com/karaoke/api/",
    headers: {
        Authorization: "Token a65ac86f0947bb6aff6035039398a1b0480e8b38",
        redirect: "follow"
    },
});

export { audioApi }
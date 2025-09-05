import axios from "axios";

const drupalApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_DRUPAL_URL}`,
});

export { drupalApi }
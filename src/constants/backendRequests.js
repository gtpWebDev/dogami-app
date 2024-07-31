// Vite accessed .env.development or .env.production as appropriate

// addresses setup differently in different files
export const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

export const REGISTER_URI = BACKEND_URI + "/user/register";
export const LOGIN_URI = BACKEND_URI + "/user/login";
export const ADD_DOGAMI_URI = BACKEND_URI + "/dogamis/create";

export const HEADER_JSON_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    mode: "cors",
  },
};

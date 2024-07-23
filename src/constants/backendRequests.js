export const BACKEND_URI =
  "https://skeleton-jwt-auth-production.up.railway.app";

export const REGISTER_URI = BACKEND_URI + "/user/register";
export const LOGIN_URI = BACKEND_URI + "/user/login";

export const HEADER_JSON_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};

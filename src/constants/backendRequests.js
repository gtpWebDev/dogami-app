// export const BACKEND_URI =
//   "https://skeleton-jwt-auth-production.up.railway.app";

export const BACKEND_URI =
  "https://dogami-backend-production-4978.up.railway.app";

export const REGISTER_URI = BACKEND_URI + "/user/register";
export const LOGIN_URI = BACKEND_URI + "/user/login";
export const ADD_DOGAMI_URI = BACKEND_URI + "/dogamis/create";

export const HEADER_JSON_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    mode: "cors",
  },
};

import moment from "moment";

import DOMPurify from "dompurify";

// success: true,
// token: "Bearer sasassas.asass"
// expiresIn: jwt.expires,
// user: {
//   username: "glen",
//   hash: "dsdsdsds",
//   salt: "dsdsdds",
//   admin: true/false,
//   owned_dogs: [],

/**
 * Authorisation class which manages local storage to store JWT token
 * information and username.
 * Username is only used on app load to load it into state and is managed
 * there from that point.
 * The class can be instantiated anywhere as no information is stored
 * in instances of the class itself.
 */

class AuthService {
  constructor() {
    // no class properties
  }

  // used to sanitize any information sent to local storage to stop cross-site scripting attacks
  sanitizeString = (str) => {
    return DOMPurify.sanitize(str);
  };

  setLocalStorage(responseObj) {
    const expires = moment().add(responseObj.expiresIn);
    localStorage.setItem("token", this.sanitizeString(responseObj.token));
    localStorage.setItem(
      "username",
      this.sanitizeString(responseObj.user.username)
    );
    localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("username");
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn;
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  // haven't used get functions where localStorage.getItem is sufficient
}

export default AuthService;

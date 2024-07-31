// Have doubled up here on learning use of the axios library
// so have separated the axios http requests into this module

import axios from "axios";

/**
 * -------------- HTTP REQUESTS ----------------
 *
 * Axios requests have the following structure:
 * Success (200 codes):
 * - response.status - 200, 400, etc.
 * - response.data - the data sent from the backend using res.json
 * - response.request - the original request
 * - response.headers - the response header
 * - response.statusText
 * - response.config
 *
 * Error (not 200 codes):
 * - error.status
 * - error.response.data - the error data sent from the backend, usually a message
 * - error.statusText
 * - a lot of additional axios-specific error info
 *
 */

/**
 * Returns the img uri for a given dogamiId
 * @param {*} dogamiId
 * @returns { success: boolean}
 */

export const axiosDogamiOpenseaUri = async (dogamiId) => {
  try {
    /**
     * tezos endpoint exists but only covers alpha:
     * `https://proxy.dogami.com/metadata/dogami/tezos/${dogamiId}`;
     * matic uri required because it covers both alpha and gamma dogami
     */

    const uri = `https://proxy.dogami.com/metadata/dogami/matic/${dogamiId}`;

    const response = await axios.get(uri);
    const successResponse = {
      success: true,
      data: response.data, // axios returns .data in JSON
      error: null,
    };
    console.log(
      "axiosDogamiOpenseaUri returning successResponse",
      successResponse
    );
    return successResponse;
  } catch (error) {
    const errorResponse = {
      success: false,
      data: null,
      error: {
        status: error.response.status,
        message: error.response.data.msg,
      },
    };
    console.log("axiosDogamiOpenseaUri returning errorResponse", errorResponse);
    return errorResponse;
  }
};

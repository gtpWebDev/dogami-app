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
 * Returns comprehensive information on a comma delimited list of dogami ids
 * @param {*} dogamiIdList - a list, form "3896,1200,13090"
 * @returns { success: boolean, data: Array }
 */

export const axiosDogamiUri = async (dogamiIdList) => {
  try {
    /**
     * improved endpoint found courtesy of Lewis on discord, form:
     * "https://proxy.dogami.com/metadata/dogami/ids/12560,2345"
     * comma delimited list at end for multiple dogami
     */

    const uri = `https://proxy.dogami.com/metadata/dogami/ids/${dogamiIdList}`;

    const response = await axios.get(uri); // response is an array
    const successResponse = {
      success: true,
      data: response.data, // axios returns .data in JSON
      error: null,
    };
    // console.log("axiosDogamiUri returning successResponse", successResponse);
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
    // console.log("axiosDogamiUri returning errorResponse", errorResponse);
    return errorResponse;
  }
};

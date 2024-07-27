// import { axiosBackendPost } from "./axiosUtility.js";

import axios from "axios";

/**
 * DO NOT RUN THIS UNTIL A NEW DOGAMI COLLECTION IS LAUNCHED.
 * A one-off procedure to collect the img_url data for the dogami alpha and gamma collections.
 * When a new collection comes along, I'll need the name of the collection
 * For example "https://opensea.io/collection/dogami" - the collection is "dogami"
 * Insert it into a new baseUrl.
 * Then I would need the apiKey.
 * Then its simply execute in node:
 * "node src/lib/collectOpenseaDogamiImgData"
 */

const BACKEND_URI = "http://localhost:3000/dogami-img/add-array";

const HEADER_JSON_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    mode: "cors",
  },
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-api-key":
      "go to developer tab while logged into opensea marketplace, valid to July 2025",
  },
};

const limit = 200;
const backendLoops = 2;
const openseaLoops = 35;

// ALPHA SERIES I: 1 - 8000
// ALPHA SERIES II: 8001 - 12000
// GAMMA SERIES I - 12001 - 16000

const gammaBaseUrl =
  "https://api.opensea.io/api/v2/collection/dogami-gamma/nfts";
const alphaBaseUrl = "https://api.opensea.io/api/v2/collection/dogami/nfts";

export const collectOpenseaDogamiImgData = async () => {
  let nextString = "LXBrPTE3Mjk2NDc2NTM=";

  try {
    // to manage body size, limit it to 1000 dogami to be sent in a single backend post request

    for (let j = 0; j < openseaLoops; j++) {
      let outputArray = [];

      for (let i = 0; i < backendLoops; i++) {
        const response = await fetch(
          `${alphaBaseUrl}?limit=${limit}&next=${nextString}`,
          options
        );

        const data = await response.json();

        let newData = [];
        data.nfts.forEach((element) => {
          // https://i.seadn.io/s/raw/files/70d23591d8de8a365ff6d85fbae48a4a.gif?w=500&auto=format
          // remove after ?
          // but don't forget it as it limits the quality nicely

          const searchText = "?";
          const pureLocId = element.display_image_url.split(searchText)[0];
          newData.push({
            dogami_official_id: parseInt(element.identifier),
            img_url: pureLocId,
          });
        });

        // Responds: {nfts: [], next }
        nextString = data.next;
        console.log("nextString", nextString);
        outputArray = [...outputArray, ...newData];
      }

      const request = {
        BACKEND_URI,
        outputArray,
        HEADER_JSON_CONFIG,
      };

      // commented out to avoid being re-run accidentally
      // const response = await axios.post(
      //   BACKEND_URI,
      //   outputArray,
      //   HEADER_JSON_CONFIG
      // );
    }

    console.log("PROCESS COMPLETE");
  } catch (error) {
    console.log("Error code:", error.code);
  }
};

collectOpenseaDogamiImgData();

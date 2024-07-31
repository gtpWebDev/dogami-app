import Dogami, { Skill } from "./classes/Dogami";

import { DOGAMI_SKILLS } from "../constants/dogamiInfo";

/**
 * Construct a dogami object as required by the back end from the dogami api response
 * @param {Object} data - returned dogami info from a dogami endpoint
 * @returns {Dogami} Dogami class
 */

export const constructDogamiObject = (data) => {
  /**
   * This function takes the response from the following endpoint:
   * https://proxy.dogami.com/metadata/dogami/ids/15653
   * Note it is possible to add extra dogami with commas - ids/14500,12000
   */

  // Setup Dogami class

  const dogami = new Dogami(data.nftId, data.name);

  let powersArray = [];

  /**
   * Run through attributes, generating data for back-end in a few different ways
   *
   * Case 1 - match trait-type and write attribute
   * Case 2 - each skill, e.g. velocity, read rank, base level and training level
   * Case 3 - generate a powers array from "boost number" attributes
   *
   */

  data.attributes.forEach((element) => {
    if (element.trait_type === "Breed") dogami.breed = element.value;
    if (element.trait_type === "Collection")
      dogami.dog_collection = element.value;
    if (element.trait_type === "Status") dogami.status = element.value;
    if (element.trait_type === "Level") dogami.level = element.value;
    if (element.trait_type === "Rarity") dogami.rarity = element.value;

    if (DOGAMI_SKILLS.includes(element.trait_type)) {
      const skill = new Skill(element.rank, element.level, element.bonus_level);
      switch (element.trait_type) {
        case "Velocity":
          dogami.velocity_stats = skill;
          break;
        case "Swim":
          dogami.swim_stats = skill;
          break;
        case "Jump":
          dogami.jump_stats = skill;
          break;
        case "Balance":
          dogami.balance_stats = skill;
          break;
        case "Might":
          dogami.might_stats = skill;
          break;
        case "Instinct":
          dogami.instinct_stats = skill;
          break;
      }
    }

    if (element.display_type === "boost_number") {
      powersArray.push(element.trait_type);
    }
  });

  dogami.powers = powersArray;

  return dogami;
};

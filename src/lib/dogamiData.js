/**
 * Construct a dogami object as required by the back end from the dogami api response
 * @param {*} data
 * @returns
 */

export const constructDogamiObject = (dogami) => {
  /**
   * extract information from attributes array
   * form: [
   *  {trait_type: "Breed", value: "Labrador"},
   *  {trait_type: "Breed", value: "Labrador"}
   * ]
   */

  const dogamiObj = {
    dogami_official_id: dogami.nftId,
    name: dogami.name,
  };

  dogami.attributes.forEach((element) => {
    if (element.trait_type === "Breed") dogamiObj.breed = element.value;
    if (element.trait_type === "Collection")
      dogamiObj.dog_collection = element.value;
    // add additional dogami model elements
  });

  return dogamiObj;
};

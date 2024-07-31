/** Dogami class constructed from information from the dogami endpoint,
 *  and passed to the backend.
 */

export default class Dogami {
  constructor(dogami_official_id, name) {
    this.dogami_official_id = dogami_official_id;
    this.name = name;
    this.breed = "";
    this.dog_collection = "";
    this.img_url = "";
    this.status = "";
    this.level = null;
    this.rarity = "";
    this.powers = [];
    this.velocity_stats = null;
    this.swim_stats = null;
    this.jump_stats = null;
    this.balance_stats = null;
    this.might_stats = null;
    this.instinct_stats = null;
  }
}

export class Skill {
  constructor(rank, base_level, trained_level) {
    this.rank = rank;
    this.base_level = base_level;
    this.trained_level = trained_level;
  }
}

const pool = require('../utils/pool');

module.exports = class Item {
    id;
    description;
    qty;
    user_id;
    bought;
  
    constructor(item) {
      this.id = item.id;
      this.description = item.description;
      this.qty = item.qty;
      this.user_id = item.user_id;
      this.bought = item.bought;
    }
}
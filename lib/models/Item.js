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

  static async insert({ description, qty, user_id }) {
    const { rows } = await pool.query(`insert into items (description, qty, user_id)
                                                values ($1, $2, $3) returning *`, [description, qty, user_id]);
    return new Item(rows[0]);
  }
};

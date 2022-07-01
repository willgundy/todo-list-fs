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

  static async getAll(id) {
    const { rows } = await pool.query('select * from items where user_id = $1', [id]);
    return rows.map(row => new Item(row));
  }

  static async updateById(id, attrs){
    const item = await Item.getItemById(id);
    if (!item) return null;
    const { description, qty, bought } = { ...item, ...attrs };
    const { rows } = await pool.query(`update items set description=$1, qty=$2, bought=$3
                                    where id=$4 returning *`, [description, qty, bought, id]);
    return new Item(rows[0]);
  }

  static async getItemById(id) {
    const { rows } = await pool.query('select * from items where id = $1', [id]);
    return new Item(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('delete from items where id = $1 returning *', [id]);
    return new Item(rows[0]);
  }
};

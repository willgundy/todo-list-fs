const pool = require('../utils/pool');

module.exports = class User {
    id;
    email;
    #passwordHash;

    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.#passwordHash = user.password_hash;
    }
}
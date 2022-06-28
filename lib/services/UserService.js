const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
    static async create({ email, password }) {
        try {

        } catch(e) {
            e.status = 401;
            throw e;
        }
    }

    //?? difference
    static async signIn({ email, password }) {
        try {

        } catch(e) {
            e.status = 401;
            throw e;
        }
    }
}

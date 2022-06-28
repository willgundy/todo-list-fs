const { Router } = require('express');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

module.exports = Router()
    .post('/', async(req, res, next) => {
        try {
            const user = await UserService.create(req.body);
            res.json(user);
        } catch(e) {
            next(e);
        }
    })
    
    .post('/sessions', async(req, res, next) => {
        try {
            //?? difference
            const token = await UserService.signIn(req.body);

            res.cookie(process.env.COOKIE_NAME, token, {
                httpOnly: true,
                secure: IS_DEPLOYED,
                sameSite: IS_DEPLOYED ? 'none' : 'strict',
                maxAge: ONE_DAY_IN_MS,
            }).json({ message: 'Signed In!' });
        } catch(e) {
            next(e);
        }
    });
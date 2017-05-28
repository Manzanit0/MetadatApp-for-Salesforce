'use strict';

/**
 * Load express libraries
 */
const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose');

/**
 * Import user model
 */
const userSchema = require('../models/user.model');

const User = mongoose.model('User', userSchema);

/**
 * Create new user
 *
 * @param req
 * @param res
 */
const postUser = (req, res) => {
    if (req.body) {
        let user = new User(req.body);

        user.save()
            .then(user => {
                res.status(201).json({result: 'ok', code: 201, data: req.body});
            })
            .catch(error => {
                res.status(500).json({result: 'error', code: 500, data: {msg: error}});
            });
    }
    else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Gets user by username
 *
 * @param req
 * @param res
 */
const getUserByUsername = (req, res) => {
    const username = req.params.username;

    if (username) {
        User.findOne({ 'username': username })
            .then(user => {
                if (user !== null) {
                    //TODO: response - user without password!
                    res.status(200).json({result: 'ok', code: 200, data: user});
                } else {
                    res.status(204).json();
                }
            })
            .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

router.post('/', postUser); //TODO: should we implement auth to create users?
router.get('/:username', passport.authenticate('basic', { session: false }), getUserByUsername);

module.exports = router;

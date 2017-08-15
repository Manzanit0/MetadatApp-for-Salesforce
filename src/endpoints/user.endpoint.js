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
const userSchema = require('../models/user.model'),
    User = mongoose.model('User', userSchema);

/**
 * Create new user
 *
 * @param req
 * @param res
 */
const postUser = (req, res) => {
    if (req.body) {
        let user = new User(req.body);
        
        // Check if a user with that email or username exists already.
        getUserByUserNameOrEmail(req.body.username)
            .then(user => {
                res.status(409).json({result: 'error', code: 409, data: {msg: 'User already exists with that username or email.'}});
            })
            // If the user doesn't exist, then create it.
            .catch(err => {
                user.save()
                    .then(user => {
                        res.status(201).json({result: 'ok', code: 201, data: req.body});
                    })
                    .catch(error => {
                        res.status(500).json({result: 'error', code: 500, data: {msg: error}});
                });
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
const getUser = (req, res) => {
    let userId = req.params.username;

    getUserByUserNameOrEmail(userId)
        .then(user => {
            if (user !== null) {
                res.status(200).json({result: 'ok', code: 200, data: user});
            } else {
                res.status(204).json();
            }
        })
        .catch(err => res.status(500).json({result: 'error', code: 500, data: {}}));
};

/**
 * Gets all users
 *
 * @param req
 * @param res
 */
const getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json({result: 'ok', code: 200, data: users});
        })
        .catch(err => {
            res.status(500).json({result: 'error', code: 500, data: {}});
        });
};

function getUserByUserNameOrEmail(userNameOrEmail) {
     return new Promise((resolve, reject) => {
         User.findOne({$or: [{username: userNameOrEmail}, {email: userNameOrEmail}]})
            .then(user => {
                if (user !== null) {
                    resolve(user);
                } else {
                    reject({"msg":"No content. WTF?"}); //TODO: When can this happen??
                }
            })
            .catch(err => reject(err));
     });
}

// TODO: Add Authentication to the endpoints. The getUser/getAllUsers should require special permissions.
router.post('/', postUser);
router.post('/:username', getUser);
router.get('/', getAllUsers);

module.exports = router;

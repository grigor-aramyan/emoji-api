var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
const auth = require("../middleware/auth");

const User = require('../models').User;

router.get('/', auth, async function(req,res,next) {
    const user = await User.findByPk(req.user_id);

    if (!user) {
        return res.json({
            error: ['User not found']
        });
    }

    return res.json(user);
});

router.patch('/', auth, async function(req,res,next) {
    const user = await User.findByPk(req.user_id);

    if (!user) {
        return res.json({
            error: ['User not found']
        });
    }

    user.name = req.body.name ? req.body.name : user.name;
    user.surname = req.body.surname ? req.body.surname : '';
    user.email = req.body.email ? req.body.email : user.email;
    user.phone = req.body.phone ? req.body.phone : '';
    user.dob = req.body.dob ? req.body.dob : '';
    user.gender = req.body.gender ? req.body.gender : null;

    try {
        user.save();
    } catch (e) {
        return res.json({
            error: e.errors.map(i => i.message)
        })
    }

    return res.json(user);
});

module.exports = router;

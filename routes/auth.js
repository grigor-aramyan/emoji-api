var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
const auth = require("../middleware/auth");

const User = require('../models').User;

router.post('/register', async function(req,res,next) {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
        return res.json({
            error: ['Name, password and email are required fields']
        });
    }

    const existingUser = await User.findOne({
        where: { email }
    });
    if (existingUser) {
        return res.json({
            error: ['User with this email already exists']
        })
    };

    const encryptedPassword = await bcrypt.hash(password, 10);
    let newUser;
    try {
        newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
    } catch (e) {
        return res.json({error: e.errors.map(i => i.message)})
    }

    const token = jwt.sign(
        { user_id: newUser.id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
    );

    newUser.token = token;

    return res.status(201).json(newUser);

});

router.post('/login', async function(req,res,next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            error: ['Password and email are required fields']
        });
    }

    const user = await User.findOne({
        where: { email }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { user_id: user.id },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        );
    
        // save user token
        user.token = token;
    
        // user
        return res.status(200).json(user);
    }

    res.json({
        error: ['Invalid credentials']
    });
});

router.patch('/reset', auth, async function(req,res,next) {
    const user = await User.findByPk(req.user_id);

    if (!user) {
        return res.json({
            error: ['User not found']
        });
    }

    const {
        old_password,
        new_password,
    } = req.body;
    if (!(old_password && new_password)) {
        return res.json({
            error: ['Both new and old passwords are required!']
        });
    }

    const confirmed = await bcrypt.compare(old_password, user.password);
    if (!confirmed) {
        return res.json({
            error: ['User with this password does not exist!']
        });
    }

    const newEncryptedPassword = await bcrypt.hash(new_password, 10);
    user.password = newEncryptedPassword;
    try {
        await user.save();
    } catch (e) {
        return res.json({
            error: e.errors.map(i => i.message)
        });
    }

    return res.json({
        msg: 'ok'
    });

});

router.get('/me', auth, async function(req,res,next) {
    const user = await User.findByPk(req.user_id);
    
    return res.status(200).json(user);
});

module.exports = router;

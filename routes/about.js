var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

const TeamMember = require('../models').TeamMember;

router.get('/', async function(req,res,next) {
    const teamMembers = await TeamMember.findAll();

    return res.json(teamMembers);
});

router.post('/', async function(req,res,next) {
    const {
        name,
        description,
        insta,
        avatar,
    } = req.body;

    if (!(name && description)) {
        return res.json({ error: ['Name and description required'] });
    }

    let newTeamMember;
    try {
        newTeamMember = TeamMember.create({
            name,
            description,
            avatar: avatar ? avatar : '',
            insta: insta ? insta : '',
        });
    } catch (e) {
        return res.json({ error: ['Can not save team member'] })
    }

    return res.json(newTeamMember);
});

module.exports = router;

var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

const Contact = require('../models').Contact;

router.get('/', async function(req,res,next) {
    const contacts = await Contact.findAll();
    if (contacts.length > 0) {
        return res.json(contacts[0]);
    } else {
        return res.json({
            phone: '',
            email: '',
            address: '',
            whatsapp: '',
            instagram: '',
            facebook: '',
            tiktok: '',
            youtube: '',
        });
    }
});

router.post('/', async function(req,res,next) {
    const contacts = await Contact.findAll();

    let selectedContact;
    if (contacts.length > 0) {
        selectedContact = contacts[0];
    } else {
        selectedContact = Contact.build();
    }

    selectedContact.phone = req.body.phone ? req.body.phone : '';
    selectedContact.email = req.body.email ? req.body.email : '';
    selectedContact.address = req.body.address ? req.body.address : '';
    selectedContact.whatsapp = req.body.whatsapp ? req.body.whatsapp : '';
    selectedContact.instagram = req.body.instagram ? req.body.instagram : '';
    selectedContact.facebook = req.body.facebook ? req.body.facebook : '';
    selectedContact.tiktok = req.body.tiktok ? req.body.tiktok : '';
    selectedContact.youtube = req.body.youtube ? req.body.youtube : '';

    try {
        selectedContact.save();
    } catch (e) {
        return res.json({ error: ['can not save data'] })
    }

    return res.json(selectedContact);

});

module.exports = router;

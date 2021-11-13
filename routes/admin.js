var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

const Giftbox = require('../models').Giftbox;
const Item = require('../models').Item;

router.get('/', async function(req,res,next) {
    const giftboxes = await Giftbox.findAll(
        {
            include: [
              { model: Item, as: 'items' }
            ]
        }
    );

    res.render('admin-index', {
        giftboxes
    });
});

router.get('/giftbox/new', async function(req,res,next) {

    res.render('giftbox-new', {

    });
});



module.exports = router;

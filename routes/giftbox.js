var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
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

    res.json({giftboxes});
});

router.post('/create', async function(req,res,next) {
    let newGiftbox;
    try {
        newGiftbox = await Giftbox.create({
            title: req.body.title,
            description: req.body.description,
            size: req.body.size,
            gend: req.body.gend,
            price: req.body.price,
            img: req.body.img, // 'https://images.ru.prom.st/618548435_w640_h640_podarok.jpg',
            item: req.body.item, // 'some long description of giftbox item',
        });
    } catch (e) {
        return res.json({error: e.errors.map(i => i.message)})
    }

    return res.json({ giftbox: newGiftbox })
});

router.post('/create2', async function(req,res,next) {
    const fg = await Giftbox.findAll(
        {
            include: [
              { model: Item, as: 'items' }
            ]
          }
    );
    let newGiftbox2;
    try {
        newGiftbox2 = await Item.create({
            giftbox_id: fg[0].id,
            name: req.body.name,
            type: req.body.typeic,
            img: req.body.img, // 'https://images.ru.prom.st/618548435_w640_h640_podarok.jpg',
        });
    } catch (e) {
        return res.json({error: e.errors.map(i => i.message)})
    }

    return res.json({newGiftbox2});
    let newGiftbox;
    try {
        newGiftbox = await Item.create({
            title: req.body.title,
            description: req.body.description,
            size: req.body.size,
            gend: req.body.gend,
            price: req.body.price,
            img: req.body.img, // 'https://images.ru.prom.st/618548435_w640_h640_podarok.jpg',
            item: req.body.item, // 'some long description of giftbox item',
        });
    } catch (e) {
        return res.json({error: e.errors.map(i => i.message)})
    }

    return res.json({ giftbox: newGiftbox })
});

router.get('/:id', async function(req,res,next) {
    const giftbox = await Giftbox.findByPk(
        req.params['id'],
        {
            include: [
              { model: Item, as: 'items' }
            ]
        }
    );
    if (!giftbox) {
        return res.json({
            error: ['Giftbox does not exist']
        })
    };

    return res.json({ giftbox })
});

module.exports = router;

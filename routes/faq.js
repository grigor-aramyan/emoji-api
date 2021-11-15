var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
const auth = require("../middleware/auth");

const Faq = require('../models').Faq;

router.get('/', async function(req,res,next) {
    const faqs = await Faq.findAll();

    const generals = [];
    const returns = [];
    const shippings = [];
    const orders = [];
    const products = [];
    faqs.forEach(f => {
        if (f.type == 'Product') {
            products.push(f);
        } else if (f.type == 'Orders') {
            orders.push(f);
        } else if (f.type == 'Shipping') {
            shippings.push(f);
        } else if (f.type == 'Returns') {
            returns.push(f);
        } else if (f.type == 'General') {
            generals.push(f);
        }
    });
    
    return res.json({
        'Product': products,
        'Orders': orders,
        'Shipping': shippings,
        'Returns': returns,
        'General': generals,
    });
});

router.post('/', async function(req,res,next) {
    const {
        type,
        question,
        answer,
    } = req.body;

    if (!(type && question && answer)) {
        return res.json({ error: 'all fields required' })
    }

    let newFaq;
    try {
        newFaq = await Faq.create({
            type,
            question,
            answer,
        });
    } catch (e) {
        return res.json({ error: 'can not save faq' })
    }

    res.json(newFaq);
});

module.exports = router;

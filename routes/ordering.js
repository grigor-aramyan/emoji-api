var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
const auth = require("../middleware/auth");

const LineItem = require('../models').LineItem;
const Order = require('../models').Order;
const User = require('../models').User;
const Giftbox = require('../models').Giftbox;

// order history list
router.get('/', auth, async function(req,res,next) {
    const user = await User.findByPk(req.user_id);

    if (!user) {
        return res.json({
            error: ['User not found']
        });
    }

    const orders = await Order.findAll({
        where: {
            user_id: user.id
        },
        include: [
            { model: LineItem, as: 'line_items' },
        ]
    });

    if (orders.length == 0) {
        return res.json({
            history: []
        });
    }

    let giftboxIds = [];
    orders.forEach(o => {
        o.line_items.forEach(li => {
            giftboxIds.push(li.giftbox_id);
        });
    });

    const uniques = Array.from(new Set(giftboxIds));

    const orderedGiftboxes = await Giftbox.findAll({
        where: {
            id: uniques
        }
    });

    return res.json({
        history: orderedGiftboxes
    });

});

// create order with line items
// {id: count, id2: count} -- for line items with id as giftbox id
router.post('/', auth, async function(req,res,next) {
    const user = await User.findByPk(req.user_id);

    if (!user) {
        return res.json({
            error: ['User not found']
        });
    }

    const orderedItems = req.body.ordered;
    if (Object.keys(orderedItems) <= 0) {
        return res.json({
            error: ['No items to order']
        });
    }

    let currentOrder;
    try {
        currentOrder = await Order.create({
            user_id: user.id,
            total_price: 1,
        });
    } catch (e) {
        return res.json({
            error: e.errors.map(i => i.message)
        });
    }

    const orderedGiftboxes = await Giftbox.findAll({
        where: {
            id: Object.keys(orderedItems)
        }
    });

    let idPrice = {};
    orderedGiftboxes.forEach(og => {
        idPrice[og.id] = og.price;
    });

    let totalPrice = 0;
    for (const [itemId, itemCount] of Object.entries(orderedItems)) {
        try {
            LineItem.create({
                order_id: currentOrder.id,
                giftbox_id: itemId,
                count: itemCount,
            });
        } catch (e) {
            return res.json({
                error: e.errors.map(i => i.message)
            });
        }

        totalPrice += idPrice[itemId] * itemCount;
    }

    currentOrder.total_price = totalPrice;
    try {
        await currentOrder.save();
    } catch (e) {
        return res.json({
            error: e.errors.map(i => i.message)
        });
    }

    const currentOrderWithItems = await Order.findByPk(currentOrder.id,
        {
            include: [
              { model: LineItem, as: 'line_items' },
              { model: User, as: 'user' },
            ]
        }
    );
    
    return res.json(currentOrderWithItems);
});

module.exports = router;

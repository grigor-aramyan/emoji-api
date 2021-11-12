var express = require('express');
var router = express.Router();

const User = require('../models').User;
const Order = require('../models').Order;

/* GET home page. */
router.get('/:id?', async function(req, res, next) {
  const users = await User.findAll(
    {
      include: [
        { model: Order, as: 'orders' }
      ]
    }
  );

  // let o;
  // try {
  //   o = await Order.create({
  //     total_price: 1500.60,
  //     user_id: users[0].id,
  //   });
  // } catch (e) {
  //   return res.json({error: e.errors.map(i => i.message)})
  // }
  
  // res.json({ order: o });
  res.json({msg: req.params.id ? req.params.id : users[0].orders.length });
});

router.post('/', async function(req, res, next) {
  const user = User.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName ? req.body.lastName : '',
    email: req.body.email,
  });

  try {
    await user.save();
  } catch (e) {
    return res.json({error: e.errors.map(i => i.message)})
  }
  
  return res.json({ user })

  // if (user.save()) {
  //   await user.reload();
  //   return res.json({
  //     user
  //   })
  // }

  // if (user) {
  //   return res.json({
  //     user
  //   });
  // }
  
  res.json({msg: user});
});

module.exports = router;

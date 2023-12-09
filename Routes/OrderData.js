const express = require("express");
const User = require("../models/User");
const Order = require("../models/Orders");

const router = express.Router();

router.post("/orderData", async (req, res) => {
    let data = [];

    // Check if req.body.order_data is an array and not empty before attempting to splice
    if (Array.isArray(req.body.order_data) && req.body.order_data.length > 0) {
      // Copy the contents of req.body.order_data into the data array
      data = req.body.order_data.slice();
    }
  
    // Add { Order_date: req.body.order_date } to the beginning of the data array
    data.unshift({ Order_date: req.body.order_date });

  // if email not existing in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
});
router.post('/myOrderData', async (req, res) => {
  try {
      // console.log(req.body.email)
      let eId = await Order.findOne({ 'email': req.body.email })
      //console.log(eId)
      res.json({orderData:eId})
  } catch (error) {
      res.send("Error",error.message)
  }
  

});
module.exports = router;

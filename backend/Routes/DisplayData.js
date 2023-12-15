const express = require("express");
const router = express.Router();

router.get("/foodData",(req,res)=>{
    try {
        // console.log(global.food_items)
        res.send([global.food_items,global.food_Cat])
    } catch (error) {
        console.log(error);
        res.send("server error")
    }
})


module.exports = router;
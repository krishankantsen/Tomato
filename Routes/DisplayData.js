const express = require("express");
const router = express.Router();

router.post("/foodData",(req,res)=>{
    try {
        // console.log(global.food_items)
        res.send([global.food_items,global.food_Cat])
    } catch (error) {
        console.log(error);
        res.send("server error")
    }
})
router.post("/getName",(req,res)=>{
    try{res.send(
     [global.user_name]
    )}catch (error) {
        console.log(error);
        res.send("server error")
    }
})


module.exports = router;
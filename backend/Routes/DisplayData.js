const express = require("express");
const router = express.Router();
const mongoose=require("mongoose")

// router.get("/foodData",async(req,res)=>{
//     try {
//         const fetchAndAssign = async (collectionName, globalVariable) => {
//             const fetchedData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
//             global[globalVariable] = fetchedData;
//         };

//         await Promise.all([
//             fetchAndAssign('food_items', 'food_items'),
//             fetchAndAssign('foodCategory', 'food_Cat'),
//             fetchAndAssign('users', 'user_name'),
//         ]);
//     } catch (err) {
//         console.error('Error fetching data:', err);
//     }
//     try {
//         res.send([global.food_items,global.food_Cat])
//     } catch (error) {
//         console.log(error);
//         res.send("server error")
//     }
// })
router.get('/foodData', async (req, res) => {
  try {
    const fetchData = async (collectionName) => {
      // Pass the collectionName to mongoose.connection.db.collection()
      const fetchedData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
      return fetchedData;
    };

    const [foodItems, foodCats] = await Promise.all([
      fetchData('food_items'),
      fetchData('foodCategory'),
    ]);

    res.send({ foodItems, foodCats });
  } catch (error) {
    console.error('Error fetching and sending data:', error);
    res.status(500).send('Server error');
  }
});

  


module.exports = router;

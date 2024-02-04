const express = require("express");
const router = express.Router();
const mongoose=require("mongoose")

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

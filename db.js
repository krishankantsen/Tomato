const mongoose = require('mongoose');


const uri = 'mongodb+srv://senjade:sen123@cluster0.3g1qzo8.mongodb.net/tomato?retryWrites=true&w=majority';

mongoose.connect(uri);

mongoose.connection.on('connected', async () => {
    console.log('Database connected');
    
    try {
        const fetchedData = await mongoose.connection.db.collection('food_items').find({}).toArray();
        // console.log('Fetched data:', fetchedData);
        global.food_items = fetchedData;
        const fetchedCat = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
        global.food_Cat=fetchedCat;
        // console.log(global.food_Cat);
        const fetchedD = await mongoose.connection.db.collection('users').find({}).toArray();
        const names = fetchedD.map(item => item.name);
        global.user_name=names
       
       
    } catch (err) {
        console.error('Error fetching data:', err);
    }
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to database:', err);
});

const mongoose = require('mongoose');

const uri = 'mongodb+srv://senjade:sen123@cluster0.3g1qzo8.mongodb.net/tomato?retryWrites=true&w=majority';

mongoose.connect(uri);

mongoose.connection.on('connected', async () => {
    console.log('Database connected');
    
    try {
        const fetchAndAssign = async (collectionName, globalVariable) => {
            const fetchedData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
            global[globalVariable] = fetchedData;
        };

        await Promise.all([
            fetchAndAssign('food_items', 'food_items'),
            fetchAndAssign('foodCategory', 'food_Cat'),
            fetchAndAssign('users', 'user_name'),
        ]);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to database:', err);
});


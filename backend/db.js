const mongoose = require('mongoose');

const uri = 'mongodb+srv://senjade:sen123@cluster0.3g1qzo8.mongodb.net/tomato?retryWrites=true&w=majority';

mongoose.connect(uri);

mongoose.connection.on('connected', async () => {
    console.log('Database connected');
    
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to database:', err);
});


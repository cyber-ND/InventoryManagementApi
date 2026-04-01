require('dotenv').config();

const express = require('express');
const connectDB = require('./configs/database');

const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');


const app = express();

app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api', productRoute);
app.use('/api', userRoute)



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
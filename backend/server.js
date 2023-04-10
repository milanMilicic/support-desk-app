const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
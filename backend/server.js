const express = require('express');
const dotenv = require('dotenv').config();
const router = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send('Hello');
})

app.use('/api/users', router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express());

// mongoDB



// mongoDB ends



app.get('/', (req, res)=> {
    res.send('Its running peacefully')
});

app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
})
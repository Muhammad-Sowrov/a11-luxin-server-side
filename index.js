const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// mongoDB


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.xz3kocr.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const hotelCollection = client.db("LuxInnDB").collection('hotels');
    const bookingCollection = client.db("LuxInnDB").collection('bookings');



    // hotel related
    app.get('/hotels', async(req, res)=> {
        const cursor = hotelCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })

    app.get('/hotels/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await hotelCollection.findOne(query);
        console.log(result);
        res.send(result);
    })

    // booking data
    app.get('/bookings', async(req, res)=>{
        // console.log(req.query);
        // const result =await bookingCollection.find().toArray();
        // res.send(result)

        console.log(req.query.email);
      let query = {};
      if (req.query?.email) {
        query = {email: req.query.email}
      }
      // console.log(query);
      const result = await bookingCollection.find(query).toArray();
      res.send(result)
    })


    app.post('/bookings', async(req, res) => {
        const booking= req.body;
        console.log(booking);
        const result = await bookingCollection.insertOne(booking)
        res.send(result)

    })











    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongoDB ends



app.get('/', (req, res)=> {
    res.send('Its running peacefully')
});

app.listen(port, ()=> {
    console.log(`Server running on: ${port}`);
})
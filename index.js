const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Define application
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Import models
const Car_Sales = require('./models/CarSale');

// Database Connection
mongoose.connect('mongodb://localhost:27017/node-api-db');

mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
  console.log('connected with database..');
});


// TO Post data to database
app.post('/CarSales',(req,res,next)=>{
  const CarSale = new Car_Sales({
    Brand:req.body.Brand,
    Model:req.body.Model,
    Owner:req.body.Owner,
    Reg_ID:req.body.Reg_ID,
    Contact_No:req.body.Contact_No,
  });

  CarSale.save(function(error, savedPost) {
    if(error) {
      // sends error response
      res.status(500).send({ error: 'Unable to save Post '})
    } else {
      // sends success response
      res.status(200).send(savedPost)
    }
  });
});

// To get details of all Posts
app.get('/CarSales', function(req, res, next){
  Car_Sales.find({}, function(error, get_All_posts) {
    if(error) {
      // sends error response
      res.status(422).send({ error: 'Unable to fetch posts '})
    } else {
      // sends success response
      res.status(200).send(get_All_posts)
    }
  });
});

// Tasks:
// To get details of Single Post 
app.get('/CarSales/:id', (req, res, next)=>{
  const {id} = req.params;
  Car_Sales.findById(id, (error, get_Single_post)=>{
    if(error) {
      // sends error response
      res.status(422).send({ error: 'Unable to fetch post '})
    } else {
      // sends success response
      res.status(200).send(get_Single_post)
    }
  });
});

// To Update a Post
app.patch('/CarSales/:id', (req, res, next)=>{
  const {id} = req.params;
  Car_Sales.findByIdAndUpdate(id, req.body, {new:true}, (error, update_post)=>{
    if(error) {
      // sends error response
      res.status(422).send({ error: 'Unable to update post '})
    } else {
      // sends success response
      res.status(200).send(update_post)
    }
  });
});

// To Delete a post
app.delete('/CarSales/:id', (req, res, next)=>{
  const {id} = req.params;
  Car_Sales.findByIdAndDelete(id, (error, delete_post)=>{
    if(error) {
      // sends error response
      res.status(422).send({ error: 'Unable to delete post '})
    } else {
      // sends success response
      res.status(200).send(delete_post)
    }
  });
});

app.listen(3001, function() {
  console.log('Server is running at port 3001....')
});

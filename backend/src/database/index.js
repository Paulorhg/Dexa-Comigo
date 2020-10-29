const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://DeixaComigoAdmin:churrasco@cluster0.ekusj.mongodb.net/DeixaComigoDB?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

module.exports = mongoose;


//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://DeixaComigoAdmin:churrasco@cluster0.ekusj.mongodb.net/DeixaComigoDB?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
//client.connect(err => {
//  const collection = client.db("DeixaComigoDB").collection("Users");
  // perform actions on the collection object
//  client.close();
//});

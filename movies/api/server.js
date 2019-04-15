const express = require("express");
const mongo = require("mongodb").MongoClient;

const app = express();

const url = 'mongodb://mongo:27017';
const dbName = 'movies';

mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err);
    return
  }

  console.log(`Connected to ${url}`);

  const db = client.db('movies');
  
  preloadData(db);

  app.listen(8000, () => {
    app.get("/api/movies", (req, res, next) => {
      db.collection('movies').find().toArray( (err, results) =>{
        if (err){
          console.log(`failed to query movies: ${err}`)
          res.json([]);
          return
        }
         res.json(results);
      });
    });

    app.get("/api/mylist", (req, res, next) => {
      db.collection('mylist').find().toArray( (err, results) =>{
        if (err){
          console.log(`failed to query movies: ${err}`)
          res.json([]);
          return
        }

        res.json(results);
      });
    });

    app.get("/api/watching", (req, res, next) => {
      db.collection('watching').find().toArray( (err, results) =>{
        if (err){
          console.log(`failed to query movies: ${err}`)
          res.json([]);
          return
        }

        res.json(results);
      });
    });

    console.log("Server running on port 8000.");
  });
});

var preloadData = function(db) {
  console.log("preloading data");
  const data = {
    movies: require("./data/movie.json"),
    mylist: require("./data/mylist.json"),
    watching: require("./data/watching.json")
  };

  createNewEntries(db.collection('movies'), data.movies.results);
  createNewEntries(db.collection('mylist'), data.mylist.results);
  createNewEntries(db.collection('watching'), data.watching.results);
}

var createNewEntries = function(collection, entries) {
  entries.forEach(function(doc) {
    doc._id = doc.id;
    collection.insertOne(doc, (err, res) => {
      if (err) {
        if (err.code != 11000){
          console.log(`error while writing to mongo: ${err}`);
        } else {
          var query = { _id: doc.id };
          var values = { $set: doc};
          collection.updateOne(query, values, (err, res) => {
            if (err) {
              console.log(`error while updating to mongo: ${err}`);
            }
          });
        }
      } 
    });
  });
};
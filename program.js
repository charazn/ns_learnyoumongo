// Lesson 1 MONGOD
// Install Mongodb using Homebrew, DO NOT DOWNLOAD 
// https://www.mongodb.com/download-center#community
// https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=1.31633086.1601841358.1482759111
// To verify that mongod is installed, you can try running mongod --version


// Lesson 2 CONNECT
// Start mongod on port 27017 with data as the dbpath. You may have to create the data directory.
// To start mongo on port 27017, run mongod --port 27017 --dbpath=./data.
// Then, in another terminal, run npm install mongodb.
// Install mongodb locally, npm install mongodb --save 
// https://www.npmjs.com/package/mongodb

// https://www.npmjs.com/package/mongodb#connecting-to-mongodb
// Connecting to MongoDB
// Let's create a new app.js file that we will use to show the basic CRUD operations using the MongoDB driver.
// First let's add code to connect to the server and the database myproject.

// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

// // Connection URL 
// var url = 'mongodb://localhost:27017/myproject';
// // Use connect method to connect to the Server 
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   db.close();
// });


// Lesson 3 FIND
// var mongo = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/learnyoumongo'
// var age = process.argv[2]

// mongo.connect(url, function (err, db) {
//   if (err) throw err
//   // db gives access to the database
//   var parrots = db.collection('parrots')

//   // db.collection.find() method queries a collection and returns a cursor to the returning documents. // https://docs.mongodb.com/v3.0/core/cursors/#read-operations-cursors
//   // A cursor is a pointer to the result set of a query. Clients can iterate through a cursor to retrieve results. By default, cursors timeout after 10 minutes of inactivity. See Cursors. // https://docs.mongodb.com/v3.0/reference/glossary/#term-cursor
//   parrots.find({ 
//     age: {
//       $gt: +age // age is already an integer, eg. var age = parseInt(process.argv[2]) or Number(process.argv[2]), then there is no need to use + here
//     }
//   }).toArray(function (err, documents) { // The toArray() method returns an array that contains all the documents from a cursor. The method iterates completely the cursor, loading all the documents into RAM and exhausting the cursor. // https://docs.mongodb.com/manual/reference/method/cursor.toArray/
//     // var myCursor = db.inventory.find( { type: 'food' } );
//     // var myDocument = myCursor[3];
//     // The myCursor[3] is equivalent to the following example:
//     // myCursor.toArray() [3];// https://docs.mongodb.com/v3.0/tutorial/iterate-a-cursor/
//     if (err) throw err
//     console.log(documents)
//     db.close()
//   })
// })

// GIVEN SOLUTION
// var mongo = require('mongodb').MongoClient
// var age = process.argv[2]

// var url = 'mongodb://localhost:27017/learnyoumongo'

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var parrots = db.collection('parrots')
//   parrots.find({
//     age: {
//       $gt: +age
//     }
//   }).toArray(function(err, docs) {
//     if (err) throw err
//     console.log(docs)
//     db.close()
//   })
// })


// Lesson 4 FIND PROJECT
// var mongo = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/learnyoumongo'
// var age = process.argv[2]

// mongo.connect(url, function (err, db) {
//   if (err) throw err
//   var parrots = db.collection('parrots')

//   parrots.find({
//     age: {
//       $gt: +age
//     }
//   }, { // this second parameter states those columns you want returned 1, or not 0
//     _id: 0,
//     name: 1,
//     age: 1
//   }).toArray(function (err, documents) { 
//     if (err) throw err
//     console.log(documents)
//     db.close()
//   })
// })

// Given Solution
// var mongo = require('mongodb').MongoClient
// var age = process.argv[2]

// var url = 'mongodb://localhost:27017/learnyoumongo'

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var parrots = db.collection('parrots')
//   parrots.find({
//     age: {
//       $gt: +age
//     }
//   }, {
//     name: 1
//   , age: 1
//   , _id: 0
//   }).toArray(function(err, docs) {
//     if (err) throw err
//     console.log(docs)
//     db.close()
//   })
// })


// Lesson 5 INSERT
// var mongo = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/learnyoumongo'
// var firstName = process.argv[2]
// var lastName = process.argv[3]
// var doc = { firstName: firstName, lastName: lastName }

// mongo.connect(url, function (err, db) {
//   if (err) throw err
//   var docs = db.collection('docs')

//   // inserting document, eg. { a : 2 }
//   docs.insert(doc, function (err, result) { // The result object if the command was executed successfully.
//     // handle error
//     if (err) throw err
//     // other operations
//     console.log(JSON.stringify(doc)) // Use console.log to print out the object used to create the document, not the result of the insert.

//     db.close()
//   })
// })

// Given Solution
// var mongo = require('mongodb').MongoClient

// var firstName = process.argv[2]
// var lastName = process.argv[3]
// var doc = {
//   firstName: firstName
// , lastName: lastName
// }

// var url = 'mongodb://localhost:27017/learnyoumongo'
// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var collection = db.collection('docs')
//   collection.insert(doc, function(err, data) {
//     if (err) throw err
//     console.log(JSON.stringify(doc))
//     db.close()
//   })
// })


// Lesson 6 UPDATE
// var mongo = require('mongodb').MongoClient
// var dbName = process.argv[2]
// var url = 'mongodb://localhost:27017/' + dbName

// mongo.connect(url, function (err, db) {
//   if (err) throw err
//   var users = db.collection('users')

//   // document // { a: 2, b: 3 }
//   // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#update
//   // Update operators https://docs.mongodb.com/manual/reference/operator/update/
//   // $set operator https://docs.mongodb.com/manual/reference/operator/update/set/#set
//   users.update({
//     username: 'tinatime'
//   }, {
//     $set: {
//       age: 40
//     }
//   }, function (err, result) {
//     if (err) throw err

//     db.close()  
//   })
// })

// Given solution
// var mongo = require('mongodb').MongoClient

// var url = 'mongodb://localhost:27017/' + process.argv[2]
// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var collection = db.collection('users')
//   collection.update({
//     username: 'tinatime'
//   }, {
//     $set: {
//       age: 40
//     }
//   }, function(err) {
//     if (err) throw err
//     db.close()
//   })
// })


// Lesson 7 REMOVE
// var mongo = require('mongodb').MongoClient
// var dbName = process.argv[2]
// var colName = process.argv[3]
// var id = process.argv[4]
// var url = 'mongodb://localhost:27017/' + dbName

// mongo.connect(url, function (err, db) {
//   if (err) throw err
//   var collection = db.collection(colName) // Since we do not know the name of the collection

//   // https://www.npmjs.com/package/mongodb#delete-a-document
//   // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#remove
//   collection.remove({
//     _id: id
//   }, function (err, result) {
//     if (err) throw err

//     db.close()  
//   })
// })

// Given solution
// var mongo = require('mongodb').MongoClient

// var url = 'mongodb://localhost:27017/' + process.argv[2]

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var collection = db.collection(process.argv[3])
//   collection.remove({
//     _id: process.argv[4]
//   }, function(err) {
//     if (err) throw err
//     db.close()
//   })
// })


// Lesson 8 COUNT
// var mongo = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/learnyoumongo'
// var age = process.argv[2]

// mongo.connect(url, function (err, db) {
//   if (err) throw err
//   var parrots = db.collection('parrots') 

//   // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#count  
//   parrots.count({
//     age: {
//       $gt: +age
//     }
//   }, function (err, result) {
//     if (err) throw err
//     console.log(result)
//     db.close()
//   })
// })

// Given solution
// var mongo = require('mongodb').MongoClient
// var age = process.argv[2]

// var url = 'mongodb://localhost:27017/learnyoumongo'

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var parrots = db.collection('parrots')
//   parrots.count({
//     age: {
//       $gt: +age
//     }
//   }, function(err, count) {
//     if (err) throw err
//     console.log(count)
//     db.close()
//   })
// })


// Lesson 9 AGGREGATE
var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/learnyoumongo'
var size = process.argv[2]

mongo.connect(url, function (err, db) {
  if (err) throw err
  var prices = db.collection('prices') 

  // https://docs.mongodb.com/manual/aggregation/
  // https://docs.mongodb.com/manual/core/aggregation-pipeline/#aggregation-pipeline-operators-and-performance
  // https://docs.mongodb.com/manual/core/aggregation-pipeline-optimization/
  // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#aggregate
  // Note: db.collection.aggregate() returns a cursor to the documents produced by the final stage of the aggregation pipeline operation.
  // Above https://docs.mongodb.com/v3.2/reference/method/db.collection.aggregate/
  prices.aggregate([ 
    { $match: { size: size } }, { $group: { _id: 'average', average: { $avg: '$price' } } } // _id must be included
  ], function (err, result) {
    // result is an array of documents, grouped by the _id 'average' which in this case is self-defined and not a current field path
    if (err) throw err
    console.log(result[0].average.toFixed(2)) // returns the average (defined above) property of the first document in the result array, the value which was already calculated using the aggregattion pipleine expression $avg on the field path $price
    db.close()
  })
})

// Example https://docs.mongodb.com/v3.2/reference/method/db.collection.aggregate/
// Group by and Calculate a Sum¶

// The following aggregation operation selects documents with status equal to "A", groups the matching documents by the cust_id field and calculates the total for each cust_id field from the sum of the amount field, and sorts the results by the total field in descending order:

// db.orders.aggregate([
//                      { $match: { status: "A" } },
//                      { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
//                      { $sort: { total: -1 } }
//                    ])
// The operation returns a cursor with the following documents:

// { "_id" : "xyz1", "total" : 100 }
// { "_id" : "abc1", "total" : 75 }

// Given solution
// var mongo = require('mongodb').MongoClient
// var size = process.argv[2]

// var url = 'mongodb://localhost:27017/learnyoumongo'

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var prices = db.collection('prices')
//   prices.aggregate([
//     { $match: {
//       size: size
//     }}
//   , { $group: {
//       _id: 'average'
//     , average: {
//         $avg: '$price'
//       }
//     }}
//   ]).toArray(function(err, results) {
//     if (err) throw err
//     if (!results.length) {
//       throw new Error('No results found')
//     }
//     var o = results[0]
//     console.log(Number(o.average).toFixed(2))
//     db.close()
//   })
// })

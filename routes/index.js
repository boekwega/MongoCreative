var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/listDB', { useNewUrlParser: true }); //Connects to a mongo database called "listDB"

var deedSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Deed: String
});

var Deed = mongoose.model('Deed', deedSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/deed', function(req, res, next) {
    console.log("POST deed route");
    console.log(req.body);
    var newdeed = new Deed(req.body);
    console.log(newdeed);
    newdeed.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });

});

/* GET stuff from database */
router.get('/deed', function(req, res, next) {
    console.log("In the GET route?");
    var requestname = req.query["q"]
    console.log(requestname)
    var obj = {};
    if (requestname) { //if there's something there
        obj = { Name: requestname }
    }
    Deed.find(obj, function(err, deedList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(deedList); //Otherwise console log the deeds you found
        }
        res.json(deedList); //Then send the deeds
    });
});

// Get all of the names from the database
router.get('/names', function(req, res, next) {
    
    console.log("in get names route");
    Deed.find({}, function(err, list) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(list); 
        }
        res.json(list); 
    })
})

//deletes everything from the database
router.delete('/deed', function(req, res, next) {

    var requestname = req.query["q"]
    console.log("requestname is "+ requestname)
    var obj = {};
    if (requestname) { //if there's something there
        obj = { Name: requestname }
        console.log("object is: " + obj);
        Deed.find(obj).remove(function(err, deedList) { //Calls the find() method on your database

            if (err) return console.error(err); //If there's an error, print it out
            else {
                console.log("in remove"); //Otherwise console log the stuff you found

                res.sendStatus(200); // we need this or it'll hang for 30 seconds.
            }

        })

    }
  

});

module.exports = router;

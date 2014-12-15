var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function (err, mongoClient) {
    db = mongoClient.db("whist");
    db.collection('players', {strict: true}, function (err, collection) {
        if (err) {
            console.log("The 'players' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

exports.findById = function (req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('players', function (err, collection) {
        collection.findOne({'id': id}, function (err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

exports.findAll = function (req, res) {
    var name = req.query["name"];
    console.log("Retrieving players by name with key: " + name);
    db.collection('players', function (err, collection) {
        if (name) {
            collection.find({"name": new RegExp(name, "i")}).toArray(function (err, items) {
                console.log(JSON.stringify(items));
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function (err, items) {
                console.log(JSON.stringify(items));
                res.jsonp(items);
            });
        }
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {

    console.log("Populating player database...");
    players = [
        {   "id": 1,
                "name": "Joris Lefever",
                
        },
        {   "id": 2,
            "name": "An Scheers",

        },
        {   "id": 3,
            "name": "Sander DeBacker",

        },
        {   "id": 4,
            "name": "Ben Beulens",

        },
        {   "id": 5,
            "name": "Geert Visseneacken",

        },
        {   "id": 6,
            "name": "Steven Coopmans",

        }   
    ];

    db.collection('players', function (err, collection) {
        collection.insert(players, {safe: true}, function (err, result) {
        });
    });

};
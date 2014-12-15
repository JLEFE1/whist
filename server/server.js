var express = require('express'),
    player = require('./routes/player');

var app = express();

app.get('/players/:id', player.findById);
app.get('/players', player.findAll);

app.listen(3000);
console.log('Listening on port 3000...');
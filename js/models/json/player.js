define(function (require) {

    "use strict";

    var Backbone = require('backbone'),

        Player = Backbone.Model.extend({

            urlRoot: "http://localhost:3000/players"

        }),

        PlayerCollection = Backbone.Collection.extend({

            model: Player,

            url: "http://localhost:3000/players"

        });

    return {
        Player: Player,
        PlayerCollection: PlayerCollection
    };

});
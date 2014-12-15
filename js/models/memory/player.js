define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        findById = function (id) {
            var deferred = $.Deferred(),
                player = null,
                l = players.length;
            for (var i = 0; i < l; i++) {
                if (players[i].id === id) {
                    player = players[i];
                    break;
                }
            }
            deferred.resolve(player);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            var results = players.filter(function (element) {
                return element.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        players = [
            {   "id": 1,
                "name": "Joris Lefever",
                "smallPic": "Joris_small.jpg",
                "largePic": "Joris.jpg"
            },
            {   "id": 2,
                "name": "An Scheers",
                "smallPic": "An_small.jpg",
                "largePic": "An.jpg"
            },
            {   "id": 3,
                "name": "Sander De Backer",
               "smallPic": "Sander_small.jpg",
                "largePic": "Sander.jpg"
            },
            {   "id": 4,
                "name": "Ben Beulens",
                "smallPic": "Ben_small.jpg",
                "largePic": "Ben.jpg"
            },
            {   "id": 5,
                "name": "Geert Vissenaeken",
               "smallPic": "Geert_small.jpg",
                "largePic": "Geert.jpg"
            },
            {   "id": 6,
                "name": "Steven Coomans",
                "smallPic": "Steven_small.jpg",
                "largePic": "Steven.jpg"
            }            
            
        ],

        Player = Backbone.Model.extend({

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        PlayerCollection = Backbone.Collection.extend({

            model: Player,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByName(options.data.name).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Player: Player,
        PlayerCollection: PlayerCollection
    };

});
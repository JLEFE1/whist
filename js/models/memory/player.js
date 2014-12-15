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
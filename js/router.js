define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Backbone = require('backbone'),
        PageSlider = require('app/utils/pageslider'),
        HomeView = require('app/views/HomeView'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "players/:id": "playerDetails"
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        playerDetails: function (id) {
            require(["app/models/player", "app/views/PlayerView"], function (models, PlayerView) {
                var player = new models.Player({id: id});
                player.fetch({
                    success: function (data) {
                        slider.slidePage(new PlayerView({model: data}).$el);
                    }
                });
            });
        }

    });

});
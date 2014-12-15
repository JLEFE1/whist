define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Handlebars      = require('handlebars'),
        Backbone        = require('backbone'),
        PlayerListView  = require('app/views/PlayerListView'),
        models          = require('app/models/player'),
        tplText         = require('text!tpl/Home.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.playerList = new models.PlayerCollection();
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new PlayerListView({collection: this.playerList, el: $(".scroller", this.el)});
            return this;
        },

        events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress"
        },

        search: function (event) {
            var key = $('.search-key').val();
            this.playerList.fetch({reset: true, data: {name: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }

    });

});
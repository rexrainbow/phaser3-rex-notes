'use strict'

var fengari = require('./../../plugins/utils/fengari-web/fengari-web.js');

var preload = function () {};

var create = function () {
    var f = fengari.load('return 1+1');
    console.log(f());
};

var sceneConfig = {
    preload: preload,
    create: create
};
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: sceneConfig
};
var game = new Phaser.Game(config);
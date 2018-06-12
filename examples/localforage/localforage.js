'use strict'

import localforage from 'rexPlugins/utils/storage/localforage/localforage.min.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var d = {
            a: Math.floor(Math.random()*100),
            b: Math.floor(Math.random()*100)
        };
        console.log(d);
        localforage.setItem('key', d);
        localforage.getItem('key', function(err, value){
            if (err) {
                console.log(err);
            } else {
                console.log(value);
            }
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);
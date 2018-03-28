'use strict'

import CSVToArray from './../../plugins/csvtoarray.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        
    }

    create() {
        var csvString = `1,2,3
4,5,6
7,8,9`;
        var result = CSVToArray(csvString);
        // result is a 3x3 string array
        console.log(result);
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
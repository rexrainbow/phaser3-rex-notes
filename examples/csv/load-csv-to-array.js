'use strict'

import CSVToArray from './../../plugins/csvtoarray.js';

const Map = Phaser.Structs.Map;

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // load csv text from external resource
        this.load.text('myArray', 'assets/texts/csvArray.csv')
    }

    create() {
        // get csv string from text cache
        var csvString = this.cache.text.get('myArray');
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
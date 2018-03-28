'use strict'

import CsvToHashTable from './../../plugins/csvtohashtable.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var csvString = `,a,b
c,1,2
d,3,4`;
        var table = new CsvToHashTable(this);
        table.loadCSV(csvString).convert();
        console.log(table.table);
        console.log(table.get('a', 'd'));
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
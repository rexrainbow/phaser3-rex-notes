import Papa from 'papaparse/papaparse.js';
import loki from 'lokijs/src/lokijs.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var csvString = `name,hp,mp
Rex,100,20
Alice,300,40`;

        var csvTable = Papa.parse(csvString, {
            dynamicTyping: true,
            header: true
        }).data;

        // Create the database
        var db = new loki();

        // Create a collection
        var children = db.addCollection('children');

        // insert csv-table
        children.insert(csvTable);

        var result = children.chain().data();
        console.log(result);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);
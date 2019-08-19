import loki from 'lokijs/src/lokijs.js';

var Between = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        // Create the database
        var db = new loki();

        // Create a collection
        var children = db.addCollection('children');

        // Insert documents
        for (var i = 0; i < 20; i++) {
            children.insert({
                id: Math.floor(i / 2),
                coin: Between(0, 100)
            });
        }

        // sort all documents by 'id'
        var result = children
            .chain() // start chain functions
            .simplesort('id')
            .data(); // get documents from result set
        console.log(result);

        // sort filtered documents by 'id'
        var result = children
            .chain()
            .find({
                'id': {
                    '$gte': 7
                }
            })
            .simplesort('id')
            .data();
        console.log(result);

        // sort filtered documents by 'id'
        var result = children
            .chain()
            .find({
                'id': {
                    '$gte': 7
                }
            })
            .simplesort('id', {
                desc: true // sort descending
            })
            .data();
        console.log(result);

        // sort filtered documents by 'id' then 'coin'
        var result = children
            .chain()
            .find({
                'id': {
                    '$gte': 7
                }
            })
            .compoundsort(['id', 'coin'])
            .data();
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
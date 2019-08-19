import loki from 'lokijs/src/lokijs.js';

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
        for (var i = 0; i < 100; i++) {
            children.insert({
                id: i,
            });
        }

        // sort all documents by 'id'
        // get result from 50 to 54
        var result = children
            .chain() // start chain functions
            .simplesort('id')
            .offset(50)
            .limit(5)
            .data(); // get documents from result set
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
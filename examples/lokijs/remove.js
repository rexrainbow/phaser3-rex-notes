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
        for (var i = 0; i < 20; i++) {
            children.insert({
                id: i,
            });
        }

        children
            .chain() // start chain functions
            .where( // pick doc which (id%2 === 1) (odd)
                function (doc) {
                    return (doc.id % 2) === 1;
                })
            .remove(); // remove result set

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
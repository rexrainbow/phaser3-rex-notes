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
        for (var i = 0; i < 10; i++) {
            children.insert({
                id: i
            });
        }
        var result = children.chain().data();
        console.log(result);        

        var s = db.serialize();
        //console.log(s);

        // load s into another db
        var db2 = new loki();
        db2.loadJSON(s);

        var coll = db2.getCollection('children');
        var result = coll.chain().data();
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
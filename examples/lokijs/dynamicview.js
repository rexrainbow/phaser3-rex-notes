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

        var view = children.addDynamicView('over3').applyFind({
            'id': {
                '$gte': 3
            }
        });

        var result = view.data();
        console.log(result);

        // Insert documents
        for (var i = 0; i < 20; i++) {
            children.insert({
                id: i
            });
        }

        var result = view.data();
        console.log(result);

        var result = view
            .branchResultset()
            .find({
                id: {
                    '$lt': 7
                }
            })
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
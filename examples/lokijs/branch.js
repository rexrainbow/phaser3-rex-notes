import loki from '../../plugins/utils/lokijs/lokijs.min.js';

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
        for (var i = 0; i < 100; i++) {
            children.insert({
                id: i
            });
        }

        var resultSet = children
            .chain()
            .where(function (doc) {
                return (doc.id % 2) === 0;
            })
            .simplesort('id');
        var resultSetClone = resultSet.branch();

        var result = resultSet
            .find({
                id: {
                    '$gt': 80
                }
            })
            .data();
        console.log(result);

        var result = resultSetClone
            .find({
                id: {
                    '$lt': 30
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
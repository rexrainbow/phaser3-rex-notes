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
                id: i,
                coin: Between(0, 100)
            });
        }

        var whereFn = function (doc) {
            return (doc.id % 2) === 1;
        }
        var mapFn = function (doc) {
            return {
                id: doc.id * 100
            }
        }
        var reduceFn = function (docArray) {
            var total = 0;
            docArray.forEach(function (doc) {
                total += doc.id;
            });
            return total;
        }
        var result = children
            .chain() // start chain functions
            .where(whereFn) // pick doc which (id%2 === 1) (odd)                
            .map(mapFn) // map document into a new anonymous collection, won't affect original collection
            .data();
        console.log(result);

        var result = children.chain().data();
        console.log(result);

        var result = children
            .chain() // start chain functions
            .where(whereFn)
            .mapReduce(mapFn, reduceFn);
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
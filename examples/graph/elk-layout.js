import phaser from 'phaser/src/phaser.js';
import GraphPlugin from '../../plugins/graph-plugin.js';
import RandomPlacePlugin from '../../plugins/randomplace-plugin.js';
import MoveToPlugin from '../../plugins/moveto-plugin.js';

const COLOR_MAIN = 0x7986cb;
const COLOR_LIGHT = 0xaab6fe;
const COLOR_DARK = 0x49599a;

const GetRandomItem = Phaser.Utils.Array.GetRandom;
const DistanceBetween = Phaser.Math.Distance.Between;
const RemoveItem = Phaser.Utils.Array.Remove;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var nodeA = CreateNode(this);
        var nodeB = CreateNode(this);
        var nodeC = CreateNode(this);
        var nodeD = CreateNode(this);
        var edgeAB = CreateEdge(this);
        var edgeAC = CreateEdge(this);
        var edgeBD = CreateEdge(this);
        var edgeCD = CreateEdge(this);

        var graph = this.rexGraph.add.graph()
            .addNodes([nodeA, nodeB, nodeC, nodeD])
            .addEdge(edgeAB, nodeA, nodeB)
            .addEdge(edgeAC, nodeA, nodeC)
            .addEdge(edgeBD, nodeB, nodeD)
            .addEdge(edgeCD, nodeC, nodeD)

        graph.on('layout.edge', function (edgeGameObject, path) {
            var startPoint = path[0];
            var endPoint = path[path.length - 1];
            edgeGameObject
                .setPosition(startPoint.x, startPoint.y)
                .setTo(0, 0, endPoint.x - startPoint.x, endPoint.y - startPoint.y)
        });

        this.rexGraph.ELKLayout(graph)
            .once('layout.complete', function () {
                console.log('layout.complete')
            })

    }

    update() {
    }
}

var CreateNode = function (scene) {
    return scene.add.rectangle(0, 0, 100, 100).setStrokeStyle(3, 0x00ffff)
}

var CreateEdge = function (scene) {
    return scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000).setLineWidth(2).setOrigin(0)
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
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexRandomPlace',
                plugin: RandomPlacePlugin,
                start: true
            },
            {
                key: 'rexMoveTo',
                plugin: MoveToPlugin,
                start: true
            }
        ],
        scene: [
            {
                key: 'rexGraph',
                plugin: GraphPlugin,
                mapping: 'rexGraph'
            }
        ]
    }
};

var game = new Phaser.Game(config);
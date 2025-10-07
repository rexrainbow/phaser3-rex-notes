import phaser from 'phaser/src/phaser.js';
import GraphPlugin from '../../plugins/graph-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var nodeA = CreateNode(this, 0xFFFF00);
        var nodeB = CreateNode(this);
        var nodeC = CreateNode(this);
        var nodeD = CreateNode(this);
        var edgeAB = CreateEdge(this);
        var edgeAC = CreateEdge(this);
        var edgeBD = CreateEdge(this);
        var edgeCD = CreateEdge(this);

        var graph = this.rexGraph.add.graph()
            .addNodes([nodeA, nodeB, nodeC, nodeD], { padding: 3 })
            .addEdge(edgeAB, nodeA, nodeB)
            .addEdge(edgeAC, nodeA, nodeC)
            .addEdge(edgeBD, nodeB, nodeD)
            .addEdge(edgeCD, nodeC, nodeD)

        this.rexGraph.ELKLayout(graph, {
            onLayoutComplete() {
                console.log('layout.complete')
            },

            layoutConfig: {
                layoutOptions: {
                    // 'elk.direction': 'DOWN'
                }
            }
        })

        console.log('done')

    }

    update() {
    }
}

var CreateNode = function (scene, color) {
    if (color === undefined) {
        color = 0x888888;
    }
    return scene.add.rectangle(0, 0, 100, 100).setStrokeStyle(3, color)
}

var CreateEdge = function (scene) {
    return scene.rexGraph.add.line({
        color: 0xff0000,
        lineWidth: 2,
        lineType: 'poly'
    });
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
        scene: [
            {
                key: 'rexGraph',
                plugin: GraphPlugin,
                mapping: 'rexGraph'
            }
        ],
    }
};

var game = new Phaser.Game(config);
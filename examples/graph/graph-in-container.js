import phaser from 'phaser/src/phaser.js';
import GraphPlugin from '../../plugins/graph-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var text = `
NODE [padding=3, 
      color=0x888888,
     ]

A [color=0xFFFF00]

A -> B -> C -> H -> I
A -> D -> E -> H -> I
A -> F -> * -> G -> I
J -> K -> L -> * -> I
* *> M -> * -> * -> I
O -> P -> Q -> R -> S
T -> U -> Q
V -> W -> X -> R
Y -> Z -> X

/*
For trees alignment, 
connect to dummy node with invisible edge
*/
I *> *1
S *> *1
        `

        var background = this.add.rectangle()
        var container = this.add.container(400, 300).setVisible(false);

        var graph = this.rexGraph.add.graph()

        this.rexGraph.buildGraphFromText(graph, {
            onCreateNodeGameObject(scene, id, parameters) {
                return CreateNode(scene, id, parameters.color);
            },
            onCreateEdgeGameObject(scene, id, parameters) {
                return CreateEdge(scene);
            },

            text: text
        })

        this.rexGraph.ELKLayout(graph, {
            container: container,
            containerPadding: 20,

            onLayoutStart() {
                container.setVisible(false);
            },

            onLayoutComplete() {
                container.setVisible(true);
                console.log('layout.complete')

                background
                    .setPosition(container.x, container.y)
                    .setSize(container.width, container.height)
                    .setFillStyle(0x333333)
            },

            onLayoutEdge(edgeGameObject, points) {
                edgeGameObject.setLine(points);
            },

            layoutConfig: {
                layoutOptions: {
                    'elk.algorithm': 'layered',
                    'elk.direction': 'DOWN',
                    'elk.edgeRouting': 'ORTHOGONAL',

                    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
                    'elk.layered.considerModelOrder.components': 'MODEL_ORDER',
                },
            }
        })

        console.log('done')

    }

    update() {
    }
}

var CreateNode = function (scene, label, color) {
    if (label === undefined) {
        label = ''
    }
    if (color === undefined) {
        color = 0x888888;
    }

    return scene.rexUI.add.label({
        width: 40, height: 40,
        background: scene.add.rectangle().setStrokeStyle(3, color),
        text: scene.add.text(0, 0, label),
        align: 'center',
    }).layout();
}

var CreateEdge = function (scene) {
    return scene.rexGraph.add.line({
        color: 0x008800,
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
            },
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ],
    }
};

var game = new Phaser.Game(config);
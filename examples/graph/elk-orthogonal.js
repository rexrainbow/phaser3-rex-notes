import phaser from 'phaser/src/phaser.js';
import GraphPlugin from '../../plugins/graph-plugin.js';
import LineShapePlugin from '../../plugins/lineshape-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var context = `
NODE [padding=3, color=0x888888]

A [color=0xFFFF00]

A -> B -> C -> H -> I
A -> D -> E -> H -> I
A -> F -> * -> G -> I
        `

        var background = this.add.rectangle()
        var container = this.add.container(400, 300).setVisible(false);

        var graph = this.rexGraph.add.graph({
            onCreateNodeGameObject(scene, id, parameters) {
                if (parameters.$dummy) {
                    return CreateDummyNode(scene);
                } else {
                    return CreateNode(scene, id, parameters.color);
                }
            },
            onCreateEdgeGameObject(scene, id, parameters) {
                return CreateEdge(scene);
            },
            container: container,
        })
            .on('layout.edge', function (edgeGameObject, points) {
                if (edgeGameObject.setLine) {
                    edgeGameObject.setLine(points);
                }
            })
            .on('layout.start', function () {
                container.setVisible(false);
            })
            .on('layout.complete', function () {
                container.setVisible(true);
                console.log('layout.complete')

                background
                    .setPosition(container.x, container.y)
                    .setSize(container.width, container.height)
                    .setFillStyle(0x333333)

                // var graphics = this.add.graphics()
                // graph.drawBounds(graphics, 0xff0000)
            }, this)
            .buildFromText(context)
            .elkLayout({
                layoutOptions: {
                    'elk.algorithm': 'layered',
                    'elk.direction': 'DOWN',
                    'elk.edgeRouting': 'ORTHOGONAL',
                    //'elk.layered.spacing.nodeNodeBetweenLayers': '60',
                    //'elk.spacing.nodeNode': '40'
                },
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

var CreateDummyNode = function (scene) {
    return scene.add.zone(0, 0, 0, 0);
}

var CreateEdge = function (scene) {
    return scene.add.rexLineShape({
        color: 0x008800,
        lineWidth: 2,
        lineType: 'poly'
    });
}

var CreateDummyEdge = function (scene) {
    return {};
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
        global: [
            {
                key: 'rexLineShape',
                plugin: LineShapePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
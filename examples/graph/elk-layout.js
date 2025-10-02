import phaser from 'phaser/src/phaser.js';
import GraphPlugin from '../../plugins/graph-plugin.js';
import LineShapePlugin from '../../plugins/lineshape-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var context = `
NODE [color=0x888888]
A [color=0xFFFF00]

A -> B -> D
A -> C -> D
        `

        var layer = this.add.layer().setVisible(false);

        var graph = this.rexGraph.add.graph({
            onCreateNodeGameObject(scene, id, parameters) {
                if (parameters.$dummy) {
                    return CreateDummyNode(scene);
                } else {
                    return CreateNode(scene, parameters.color);
                }
            },
            onCreateEdgeGameObject(scene, id, parameters) {
                return CreateEdge(scene);
            },
            layer: layer,
        })
            .on('layout.edge', function (edgeGameObject, points) {
                if (edgeGameObject.setLine) {
                    edgeGameObject.setLine(points);
                }
            })
            .on('layout.start', function () {
                layer.setVisible(false);
            })
            .on('layout.complete', function () {
                layer.setVisible(true);
                console.log('layout.complete')
            })
            .buildFromText(context)
            .elkLayout({
                layoutOptions: {
                    // 'elk.direction': 'DOWN'
                },

                x: 100, y: 100,
            })

        console.log('done')

    }

    update() {
    }
}

var CreateNode = function (scene, color) {
    return scene.add.rectangle(0, 0, 100, 100).setStrokeStyle(3, color)
}

var CreateDummyNode = function (scene) {
    return scene.add.zone(0, 0, 0, 0);
}

var CreateEdge = function (scene) {
    return scene.add.rexLineShape({
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
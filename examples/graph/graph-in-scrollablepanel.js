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
J -> K -> L -> * -> I
M -> * -> * -> * -> I
O -> P -> Q -> R -> S
T -> U -> Q
V -> W -> X -> R
Y -> Z -> X
        `

        var panel = CreateScrollablePanel(this, 300, 300)
            .setPosition(400, 300)
            .layout();

        BuildGraph(panel, context)

    }

    update() {
    }
}

var CreateGraphContainer = function (scene) {
    var container = scene.add.container()
    var graph = scene.rexGraph.add.graph({
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
        containerPadding: 20,
    })
        .on('layout.edge', function (edgeGameObject, points) {
            if (edgeGameObject.setLine) {
                edgeGameObject.setLine(points);
            }
        })

    container.graph = graph;

    return container;
}

var BuildGraph = async function (panel, context) {
    var container = panel.getElement('panel');

    container.setVisible(false);

    await container.graph
        .buildFromText(context)
        .elkLayoutPromise({
            layoutOptions: {
                'elk.algorithm': 'layered',
                'elk.direction': 'DOWN',
                'elk.edgeRouting': 'ORTHOGONAL',
                //'elk.layered.spacing.nodeNodeBetweenLayers': '60',
                //'elk.spacing.nodeNode': '40'
            },
        })

    container.setVisible(true);

    panel.layout();

    // var graphics = panel.scene.add.graphics()
    // panel.drawBounds(graphics, 0xff0000)
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

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateScrollablePanel = function (scene, width, height) {
    var panel = scene.rexUI.add.scrollablePanel({
        width, height,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

        panel: {
            child: CreateGraphContainer(scene),
            mask: {
                mask: true,
                padding: 1,
            }
        },

        sliderX: {
            track: { width: 20, radius: 10, color: COLOR_DARK },
            thumb: { radius: 13, color: COLOR_LIGHT }
        },

        sliderY: {
            track: { width: 20, radius: 10, color: COLOR_DARK },
            thumb: { radius: 13, color: COLOR_LIGHT }
        },

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 30,
            sliderX: 10,
            sliderY: 10,
            header: 10,
            footer: 10,
        }
    })

    return panel;
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
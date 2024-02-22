import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var RootColor = 'silver';
var KeyColor = 'lightgreen';
var NumberValueColor = 'white';
var StringValueColor = 'cyan';
var ValueColors = { 'number': NumberValueColor, 'string': StringValueColor };

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var data = {
            a: 10,
            b: 'hello',
            c: {
                d: 20,
                e: 'world'
            }
        }

        var trees = CreateTrees(this)
            .setPosition(200, 100)
            .setMinWidth(300)
            .setOrigin(0)

        var root = trees.addTree('root');
        root.setText(`[color=${RootColor}]root[/color]`);

        DisplayData(root, data);

        trees.layout();
    }

    update() { }
}

var CreateTrees = function (scene) {
    return scene.rexUI.add.trees({
        tree: {
            space: {
                indent: 30,
                nodeLeft: 10, nodeRight: 10, nodeTop: 10, nodeBottom: 10,
                toggleButton: 5
            },

            toggleButton: {
                color: COLOR_LIGHT,
                padding: 2
            },

            nodeBody: {
                text: {
                    $type: 'bbcodetext',
                    fontSize: 18
                },

                background: {
                    'hover.strokeColor': 0xffffff,
                    'hover.strokeAlpha': 0.5,
                    'hover.strokeWidth': 2
                }
            },
        }

    })
}

var DisplayData = function (tree, data) {
    for (var key in data) {
        var value = data[key];

        var node;
        if (typeof (value) === 'object') {
            node = tree.addTree(key);
            DisplayData(node, value);
        } else {
            node = tree.addNode(key);
        }

        DecorateNodeBody(node.getElement('nodeBody'), key, value);
    }
    return tree;
}

var DecorateNodeBody = function (nodeBody, key, value) {
    var valueColor = ValueColors[typeof (value)];
    if (valueColor) {
        nodeBody.setText(`[color=${KeyColor}]${key}[/color] [color=grey]:[/color] [color=${valueColor}]${value}[/color]`)
    } else {
        nodeBody.setText(`[color=${KeyColor}]${key}[/color]`);
    }

    nodeBody
        .setInteractive()
        .on('pointerover', function () {
            nodeBody.setHoverState();
        })
        .on('pointerout', function () {
            nodeBody.setHoverState(false);
        })
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);
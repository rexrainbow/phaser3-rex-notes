import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

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
        root.setText('[color=silver]root[/color]');

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
                }
            },
        }

    })
}

var DisplayData = function (tree, data) {
    for (var key in data) {
        var value = data[key];
        var valueType = typeof (value);
        switch (valueType) {
            case 'number':
                var node = tree.addNode(key);
                node.setText(`[color=lightgreen]${key}[/color] : [color=white]${value}[/color]`);
                break;

            case 'string':
                var node = tree.addNode(key);
                node.setText(`[color=lightgreen]${key}[/color] : [color=cyan]"${value}"[/color]`);
                break;

            default:
                var node = tree.addTree(key);
                node.setText(`[color=lightgreen]${key}[/color]`);
                DisplayData(node, value);
                break;
        }
    }
    return tree;
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
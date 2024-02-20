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
        var trees = this.rexUI.add.trees({
            x: 200, y: 100,
            width: 300,

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
                        fontSize: 18
                    }
                },
            }

        })
            .setOrigin(0)

        this.add.existing(trees);

        var root, subTree, node;

        root = trees.addTree('t0');
        root.getElement('nodeBody').resetDisplayContent('T0');

        subTree = root.addTree('t00');
        subTree.getElement('nodeBody').resetDisplayContent('T00');

        node = subTree.addNode('t00n0');
        node.getElement('nodeBody').resetDisplayContent('T00N0');

        node = subTree.addNode('t00n1');
        node.getElement('nodeBody').resetDisplayContent('T00N1');

        node = subTree.addNode('t00n2');
        node.getElement('nodeBody').resetDisplayContent('T00N2');

        subTree = root.addTree('t01');
        subTree.getElement('nodeBody').resetDisplayContent('T01');

        node = subTree.addNode('t01n0');
        node.getElement('nodeBody').resetDisplayContent('T01N0');

        node = subTree.addNode('t01n1');
        node.getElement('nodeBody').resetDisplayContent('T01N1');

        trees.layout();
    }

    update() { }
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
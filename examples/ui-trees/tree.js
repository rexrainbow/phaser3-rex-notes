import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Trees from '../../templates/ui/trees/Trees.js';

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
        var trees = new Trees(this, {
            x: 200, y: 100,
            width: 300,

            tree: {
                space: {
                    indent: 30,
                    nodeLeft: 10, nodeRight: 10, nodeTop: 10, nodeBottom: 10,
                    toggleButton: 5
                },

                toggleButton: function (scene) {
                    return scene.rexUI.add.triangle({
                        color: COLOR_LIGHT,
                        padding: 2
                    })
                        .on('expand.start', function (gameObject) {
                            gameObject.setDirection('down');
                        })
                        .on('collapse.start', function (gameObject) {
                            gameObject.setDirection('right');
                        })
                },

                nodeBackground: function (scene, { isLeaf }) {
                    return scene.rexUI.add.roundRectangle({
                        color: (isLeaf) ? COLOR_DARK : COLOR_MAIN,
                        strokeColor: COLOR_LIGHT,
                        strokeWidth: 2
                    })
                },

                nodeBody: function (scene, { isLeaf }) {
                    return scene.rexUI.add.label({
                        text: scene.add.text(0, 0, '', {
                            fontSize: 18
                        }),
                    });

                },
            }

        })
            .setOrigin(0)

        this.add.existing(trees);

        var root = trees.addTree('t0');
        root.getElement('nodeBody').text = 'T0';

        var subTree = root.addTree('t00');
        subTree.getElement('nodeBody').text = 'T00';

        var node = subTree.addNode('t00n0');
        node.getElement('nodeBody').text = 'T00N0';

        node = subTree.addNode('t00n1');
        node.getElement('nodeBody').text = 'T00N1';

        node = subTree.addNode('t00n2');
        node.getElement('nodeBody').text = 'T00N2';

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
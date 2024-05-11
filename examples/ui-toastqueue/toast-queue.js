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
        var toastQueue = this.rexUI.add.toastQueue({
            x: 200, y: 600,
            originY: 1,
            space: { item: 8 },

            createMessageLabelCallback(scene, message) {
                return scene.rexUI.add.label({
                    width: 240,
                    space: { left: 10, right: 10, top: 10, bottom: 10 },
                    background: scene.rexUI.add.roundRectangle({ color: COLOR_MAIN, radius: 10 }),
                    text: scene.add.text(0, 0, message, { fontSize: 20 }),
                    wrapText: true,
                });
            },

            duration: {
                hold: 4000
            }

        })
        this.add.existing(toastQueue);

        var index = 0;
        for (var i = 0; i < 3; i++) {
            toastQueue.showMessage(`Notification ${index}`);
            index++;
        }

        this.add.text(500, 300, 'Create')
            .setInteractive()
            .on('pointerdown', function () {
                toastQueue.showMessage(`Notification ${index}`);
                index++;
            })
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
import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var item = this.rexUI.add.badgeLabel({
            x: 400, y: 300,
            width: 80, height: 80,
            space: { left: -5, right: -5, top: -5, bottom: -5 },

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            main: this.add.text(0, 0, 'Item', { fontSize: '20px', color: 'white' }),

            rightBottom: this.add.text(0, 0, '', {
                color: 'yellow',
                align: 'right',
                backgroundColor: '#260e04',
                padding: { left: 3, right: 3, top: 3, bottom: 3 }
            }),
        })
            .layout()

        item.on('changedata-itemCount', function (parent, value, previousValue) {
            item.getElement('rightBottom').setText(value);
            item.layout();
        }, item)

        item.setData('itemCount', undefined)
            .setData('itemCount', 3)

        item
            .setInteractive()
            .on('pointerdown', function () {
                item.setData('itemCount', item.getData('itemCount') + 1)
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
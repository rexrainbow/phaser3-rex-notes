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
        for (var i = 0; i < 5; i++) {
            let card = CreateCard(
                this,
                200 + i * 80,
                250 + i * 40,
                `Card-${i}`
            )

            card
                .setInteractive()
                .on('pointerdown', function () {
                    this.children.bringToTop(card.getData('layer'));
                }, this)
        }
    }

    update() { }
}

var CreateCard = function (scene, x, y, name) {
    var layer = scene.add.layer().setName(name);
    return scene.rexUI.add.label({
        x: x, y: y,
        width: 200, height: 300,
        orientation: 'y',
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, name, {
            fontSize: '24px'
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 160, 160, 10, COLOR_DARK),
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            icon: 10, text: 10,
        },
        name: name
    })
        .setData('layer', layer)
        .addToLayer(layer)
        .layout();
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
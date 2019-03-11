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

    preload() {}

    create() {
        var x = 400,
            y = 300,
            minWidth = 250,
            minHeight = 400;
        var pages = this.rexUI.add.pages(x, y, minWidth, minHeight)
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY)
            )
            .addPage(
                this.rexUI.add.label({
                    // icon: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_LIGHT),
                    text: this.add.text(0, 0, 'A', {
                        fontSize: 24
                    })
                }), // game object
                'A', // key
                'top', // align
                0, // padding
                false, // extend
            )
            .addPage(
                this.rexUI.add.label({
                    // icon: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'B', {
                        fontSize: 24
                    })
                }), // game object
                'B', // key
                'top', // align
                0, // padding
                false, // extend
            )
            .swap('B')
            .layout();

        // pages.drawBounds(this.add.graphics(), 0xff0000);

        this.input.on('pointerdown', function () {
            var newKey = (pages.currentKey === 'A') ? 'B' : 'A';
            pages
                .swap(newKey)
                .layout();
        });
    }

    update() {}
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
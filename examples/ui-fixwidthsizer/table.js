import phaser from 'phaser/src/phaser.js';
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

    preload() { }

    create() {
        // Create table body
        var sizer = this.rexUI.add.fixWidthSizer({
            x: 400, y: 300,
            width: 250, height: 200,
            space: {
                left: 3,
                right: 3,
                top: 3,
                bottom: 3,
                item: 8,
                line: 8,
            },
        })
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK))
            .layout();

        var columnCount = 4;
        var cellWidth = (sizer.innerWidth / columnCount) - 6;
        for (var i = 0; i < 30; i++) {
            sizer.add(this.rexUI.add.label({
                width: cellWidth, height: cellWidth,

                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
                text: this.add.text(0, 0, `${i}`, {
                    fontSize: 18
                }),

                align: 'center',
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                }
            }));
        }
        sizer.layout();
        sizer.drawBounds(this.add.graphics(), 0xff0000);
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
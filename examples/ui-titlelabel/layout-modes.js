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

    preload() {
    }

    create() {
        var boundsGraphics = this.add.graphics().setDepth(100);

        this.rexUI.add.titleLabel({
            x: 150, y: 100,
            width: 200, height: 40,

            layoutMode: 0,

            background: this.rexUI.add.roundRectangle({ radius: 20, color: COLOR_PRIMARY }),
            title: this.add.text(0, 0, 'Title'),
            separator: this.rexUI.add.roundRectangle({ height: 4, color: COLOR_DARK }),
            text: this.add.text(0, 0, 'Text'),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            align: {
                title: 'right',
                text: 'right'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                separator: 2, separatorLeft: -60, separatorRight: -10,
            }

        })
            .layout()
            .drawBounds(boundsGraphics, 0xff0000)

        this.rexUI.add.titleLabel({
            x: 150, y: 300,
            width: 240,

            layoutMode: 1,

            background: this.rexUI.add.roundRectangle({ radius: 20, color: COLOR_PRIMARY }),
            title: this.add.text(0, 0, 'Title'),
            separator: this.rexUI.add.roundRectangle({ height: 4, color: COLOR_DARK }),
            text: this.add.text(0, 0, 'Text\nText\nText\nText'),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            align: {
                // title: 'left',
                // text: 'left'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,

                titleLeft: 20,
                separator: 3,
                icon: 20,
            }

        })
            .layout()
            .drawBounds(boundsGraphics, 0xff0000)

        this.rexUI.add.titleLabel({
            x: 400, y: 300,
            width: 240,

            layoutMode: 1,

            background: this.rexUI.add.roundRectangle({ radius: { tr: 20, bl: 20, br: 20 }, color: COLOR_PRIMARY }),
            text: this.add.text(0, 0, 'Text\nText\nText\nText'),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            title: this.rexUI.add.label({
                width: 100, height: 36,
                background: this.rexUI.add.roundRectangle({ radius: { tl: 10, tr: 10 }, color: COLOR_PRIMARY }),
                text: this.add.text(0, 0, 'Title'),
                align: 'center',
                space: { left: 10, right: 10, top: 10, bottom: 10 }
            }),

            align: {
                // title: 'left',
                // text: 'left'
            },

            space: {
                left: 20, right: 20, top: -36, bottom: 20,

                title: 20, titleLeft: -20,
                icon: 20,
            }

        })
            .layout()
            .drawBounds(boundsGraphics, 0xff0000)

        this.rexUI.add.titleLabel({
            x: 650, y: 300,
            width: 240,

            layoutMode: 1,

            innerBackground: this.rexUI.add.roundRectangle({ radius: { tr: 20, bl: 20, br: 20 }, color: COLOR_PRIMARY }),
            title: this.rexUI.add.label({
                width: 100,
                background: this.rexUI.add.roundRectangle({ radius: { tl: 10, tr: 10 }, color: COLOR_PRIMARY }),
                text: this.add.text(0, 0, 'Title'),
                align: 'center',
                space: { left: 10, right: 10, top: 10, bottom: 10 }
            }),
            text: this.add.text(0, 0, 'Text\nText\nText\nText'),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            align: {
                // title: 'left',
                // text: 'left'
            },

            space: {
                innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,
                icon: 20,
            }

        })
            .layout()
            .drawBounds(boundsGraphics, 0xff0000)

        this.input.on('pointerdown', function () {
            boundsGraphics.visible = !boundsGraphics.visible;
        })
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
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
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

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
        this.load.image('pause', 'assets/images/pause.png');
        this.load.image('play', 'assets/images/play.png');
        this.load.image('bg', 'assets/images/ninepatch/nine-patch.png');
    }

    create() {
        var style = {
            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 5 },
            background: {
                key: 'bg',
                leftWidth: 20, rightWidth: 20,
                topHeight: 20, bottomHeight: 20
            },
            text: {
                key: 'gothic',
                fontSize: 24,
                color: 0x888888,
            }
        }

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 200,
            orientation: 'y',
            space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 },
        })
            .addBackground(
                this.rexUI.add.roundRectangle({
                    color: COLOR_DARK,
                    strokeColor: COLOR_LIGHT,
                    radius: 20,
                })
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        text: 'AAA'
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'pause',
                        text: 'BBB'
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        text: 'CCC'
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'pause',
                        text: 'DDD'
                    }),

                { expand: true }
            )
            .layout()


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
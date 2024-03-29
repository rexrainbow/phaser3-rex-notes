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
        this.load.image('play', 'assets/images/play.png');
    }

    create() {
        var style = {
            height: 80,

            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 5 },

            background: {
                color: COLOR_MAIN,
                strokeColor: COLOR_LIGHT,
                radius: 10,
            },

            text: {
                $type: 'textarea',

                space: { left: 5, right: 5, top: 5, bottom: 5, text: 10 },

                text: {
                    $type: 'bbcodetext'
                },

                slider: {
                    track: { color: COLOR_DARK, radius: 8, width: 16 },
                    thumb: { color: COLOR_LIGHT, radius: 11, width: 22, },
                }
            },
            expandTextWidth: true,
            expandTextHeight: true,
        }

        var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 400,
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
                        text: content
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        text: content
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        text: content
                    }),

                { expand: true }
            )
            .add(
                this.rexUI.add.simpleLabel(style)
                    .resetDisplayContent({
                        icon: 'play',
                        text: content
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
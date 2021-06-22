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

    preload() { }

    create() {
        var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 500,
            orientation: 'x',

            space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
        })
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY))
            .add(this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), 0, 'bottom')
            .add(this.rexUI.wrapExpandText(
                this.rexUI.add.dynamicText(0, 0, {
                    text: content,
                    wrap: {
                        lineHeight: 24,
                        padding: { bottom: 12 }
                    }
                })),
                1, 'centet', 0, true)
            .add(this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), 0, 'bottom')
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
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
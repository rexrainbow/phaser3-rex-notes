import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 200, height: 40,
            orientation: 'x',
        })
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 1, 1, 0).setStrokeStyle(2, 0x98D998), // child
                { top: 5, left: 5 },                                                      // padding
                'bg0'                                                                     // key
            )
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 1, 1, 0).setStrokeStyle(2, 0x1860A3), // child
                { bottom: 5, right: 5 },                                                  // padding
                'bg1'                                                                     // key
            )
            .addSpace()
            .add(
                this.add.text(0, 0, 'Hello'),// child
                {
                    proportion: 0,
                    align: 'center',
                    expand: false
                }
            )
            .addSpace()
            .layout()


        this.input.once('pointerdown', function () {
            sizer
                .setChildOuterPadding(
                    'bg0',
                    {
                        left: -20, right: -20, top: -20, bottom: -20
                    }
                )
                .layout();
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
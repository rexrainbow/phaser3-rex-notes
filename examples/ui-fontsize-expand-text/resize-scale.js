import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var label = this.rexUI.add.label({
            anchor: {
                width: '50%', height: '20%',
                centerX: 'center', centerY: 'center'
            },

            background: this.rexUI.add.roundRectangle({ radius: 40, strokeColor: 0xffffff }),

            text: this.rexUI.fontSizeExpandText(CreateTextGameObject(this, 'Gallery'), { fitHeight: true }),
            // text: this.rexUI.fontSizeExpandText(CreateBitmapText(this, 'Gallery'), { fitHeight: true }),

            expandTextWidth: true,
            expandTextHeight: true,

            space: { left: 20, right: 20, top: 20, bottom: 20 },
        })
            .layout()
    }

    update() { }
}

var CreateTextGameObject = function (scene, text) {
    return scene.add.text(0, 0, text, {
        backgroundColor: 'grey'
    })
}

var CreateBitmapText = function (scene, text) {
    return scene.add.bitmapText(0, 0, 'gothic', text);
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
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
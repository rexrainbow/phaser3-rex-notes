import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';

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
        this.load.image('indicator', 'assets/images/indicator.png');
    }

    create() {
        this.add.image(0, 0, 'indicator').setOrigin(0)

        var print0 = this.add.text(0, 0, '');
        var slider = this.rexUI.add.slider({
            x: 400,
            y: 300,
            width: 400,
            height: 40,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 0).setStrokeStyle(2, 0xffffff, 0.5),
            indicator: AddCropResizeMethod(this.add.image(0, 0, 'indicator')),
            thumb: this.rexUI.add.roundRectangle(0, 0, 10, 25, 0),

            valuechangeCallback: function (value) {
                print0.text = value;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'click', // 'drag'|'click'
        })
            .layout();

    }

    update() { }
}

var AddCropResizeMethod = function (gameObject) {
    gameObject.resize = function (width, height) {
        gameObject.setCrop(0, 0, width, height);
        return gameObject;
    }

    return gameObject;
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
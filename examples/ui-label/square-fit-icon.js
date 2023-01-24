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
        this.load.image('volume', 'assets/images/volume.png');
    }

    create() {
        var rowCount = 5; // Change it to 3, 5, 10

        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 400, height: 400,
            orientation: 1
        })

        for (var i = 0; i < rowCount; i++) {
            sizer.add(
                CreateLabel(this),
                { proportion: 1, expand: true }
            )
        }

        sizer.layout();
    }

    update() { }
}

var CreateLabel = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({ strokeColor: COLOR_LIGHT }),
        text: scene.add.text(0, 0, 'AAAAAAA'),
        // icon: scene.rexUI.add.roundRectangle({ color: COLOR_PRIMARY }),
        icon: scene.add.image(0, 0, 'volume'),
        squareFitIcon: true,
        space: {
            left: 10, right: 10, top: 10, bottom: 10,
            icon: 10, text: 10,
        }
    })
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
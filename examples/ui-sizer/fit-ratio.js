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
        this.load.image('icon', 'assets/images/card2.png');
    }

    create() {
        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            // width: 500, 
            height: 200,
            orientation: 'x',
            space: { left: 10, right: 10, top: 10, bottom: 10, item: 5 }
        })
            .addBackground(this.add.rectangle(0, 0, 1, 1, COLOR_MAIN))

        for (var i = 0; i < 3; i++) {
            AddImage(sizer, 'icon');
        }

        sizer.layout();

    }

    update() { }
}

var AddImage = function (sizer, key) {
    var icon = sizer.scene.add.image(0, 0, key);
    sizer.add(icon, { fitRatio: icon.width / icon.height })
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
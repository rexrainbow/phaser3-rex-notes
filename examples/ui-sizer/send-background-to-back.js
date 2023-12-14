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

    preload() { }

    create() {
        var item = this.rexUI.add.roundRectangle({ width: 200, height: 200, color: COLOR_DARK });
        var ui = CreateUI(this, item)
            .setPosition(400, 300)
            .layout()
    }

    update() { }
}

var CreateUI = function (scene, item) {
    var background = scene.rexUI.add.roundRectangle({ radius: 10, color: COLOR_MAIN });
    var title = scene.add.text(0, 0, 'Title');

    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
        .addBackground(background)
        .add(title, { padding: { bottom: 10 } })
        .add(item)
        // All children are added to container(sizer), put background to bottom
        .sendChildToBack(background)
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
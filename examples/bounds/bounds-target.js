import phaser from 'phaser/src/phaser.js';
import BoundsPlugin from '../../plugins/bounds-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var bg = this.add.rectangle(400, 300, 300, 300, 0x333333)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                bg.setPosition(dragX, dragY);
            })
        var obj = this.add.circle(400, 300, 20, 0xff0000)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                obj.setPosition(dragX, dragY);
            })

        var bounds = this.plugins.get('rexBounds').add(obj, {
            target: bg,
            enable: true,
            // alignMode: 'origin'
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
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexBounds',
            plugin: BoundsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
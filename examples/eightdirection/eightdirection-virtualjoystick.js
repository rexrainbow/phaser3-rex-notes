import EightDirectionPlugin from '../../plugins/eightdirection-plugin.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var joyStick = this.plugins.get('rexVirtualJoyStick').add(this, {
            x: 120,
            y: 480,
            radius: 100
        })

        var obj = this.add.line(400, 300, 30, 0, 0, 0, 0x00cccc).setLineWidth(4, 15);
        obj.eightDirection = this.plugins.get('rexEightDirection').add(obj, {
            dir: 3,
            rotateToDirection: true,
            cursorKeys: joyStick.createCursorKeys()
        });
        obj.body
            .setSize(30, 30)
            .setCollideWorldBounds();
    }

    update() {}
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
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [{
                key: 'rexEightDirection',
                plugin: EightDirectionPlugin,
                start: true
            },
            {
                key: 'rexVirtualJoyStick',
                plugin: VirtualJoyStickPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
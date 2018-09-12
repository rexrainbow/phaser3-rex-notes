import EightDirectionPlugin from 'rexPlugins/eightdirection-plugin.js';
import VirtualJoyStickPlugin from 'rexPlugins/virtualjoystick-plugin.js';

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

        var obj = this.add.graphics()
            .fillStyle(0x00cccc, 1)
            .fillPoint(0, 0, 30)
            .fillStyle(0xcc0000, 1)
            .fillPoint(10, 0, 10)
            .setPosition(400, 300);
        this.physics.add.existing(obj, false);
        obj.body
            .setSize(30, 30)
            .setOffset(-15, -15)
            .setCollideWorldBounds();
        obj.eightDirection = this.plugins.get('rexEightDirection').add(obj, {
            dir: 3,
            rotateToDirection: true,
            cursorKeys: joyStick.createCursorKeys()
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
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
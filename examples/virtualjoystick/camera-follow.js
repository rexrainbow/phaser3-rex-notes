import phaser from 'phaser/src/phaser.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.player = this.matter.add.image(100, 100, '__WHITE').setScale(10);

        this.cameras.main.setBounds(0, 0, 13000, 13000);
        this.cameras.main.startFollow(this.player);

        this.joystick = this.joystickPlugin.add(this, {
            x: 150,
            y: 450,
            radius: 100,
            fixed: true,
            base: this.add.circle(200, 200, 80, 0x6666ff),
            thumb: this.add.circle(0, 0, 30, 0x0011ff)
        });

        this.print = this.add.text(0, 0, '').setScrollFactor(0);
    }

    update() {
        this.player.setVelocity(0);

        if (this.joystick.up) {
            this.player.setVelocityY(-3);
        }
        if (this.joystick.down) {
            this.player.setVelocityY(3);
        }
        if (this.joystick.left) {
            this.player.setVelocityX(-3);
        }
        if (this.joystick.right) {
            this.player.setVelocityX(3);
        }

        this.print.text = `${this.player.x},${this.player.y}`
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { x: 0, y: 0 },
            debug: true
        }
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
            start: true,
            mapping: 'joystickPlugin'
        }]
    }
};

var game = new Phaser.Game(config);
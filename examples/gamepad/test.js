import phaser from 'phaser/src/phaser.js';


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.print = this.add.text(0, 0, '')

        var gamepadManager = this.input.gamepad;
        gamepadManager
            .on('connected', function () {
                console.log(gamepadManager.pad1);
            })
            .on('disconnected', function () {
                console.log(gamepadManager.pad1);
            })
    }

    update() {
        if (this.input.gamepad.pad1) {
            this.print.text = 'Has pad1'
        }
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    input: {
        gamepad: true
    },
    scene: Demo,
};

var game = new Phaser.Game(config);
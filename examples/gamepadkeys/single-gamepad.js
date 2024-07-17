import phaser from 'phaser/src/phaser.js';
import GamepadKeys from '../../plugins/input/gamepadkeys/GamepadKeys.js';


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

        this.gamepad0 = new GamepadKeys(this);

        this.add.text(0, 300, 'Unbind')
            .setInteractive()
            .on('pointerup', function () {
                this.gamepad0.unBindGamepad();
            }, this)
    }

    update() {
        if (this.gamepad0.isConnected) {
            var keys = this.gamepad0.keys;
            var s = 'Key down: ';
            for (var name in keys) {
                if (keys[name].isDown) {
                    s += `${name} `;
                }
            }

            this.print.text = s;

        } else {
            this.print.text = 'Press any key'

        }
    }
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
    input: {
        gamepad: true
    },
    scene: Demo,
};

var game = new Phaser.Game(config);
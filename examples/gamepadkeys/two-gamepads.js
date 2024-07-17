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
        this.print0 = this.add.text(0, 0, '')
        this.print1 = this.add.text(400, 0, '')

        this.gamepad0 = new GamepadKeys(this, { autoBinding: false });
        this.gamepad1 = new GamepadKeys(this, { autoBinding: false });

        var btn0 = this.add.text(0, 300, 'Bind')
            .setInteractive()
            .on('pointerup', function () {
                if (this.gamepad0.waitBinding || this.gamepad1.waitBinding) {
                    return;
                }

                this.gamepad0.reBindGamepad(function () {
                    btn0.setColor('white')
                })

                btn0.setColor('red')
            }, this)

        var btn1 = this.add.text(400, 300, 'Bind')
            .setInteractive()
            .on('pointerup', function () {
                if (this.gamepad0.waitBinding || this.gamepad1.waitBinding) {
                    return;
                }

                this.gamepad1.reBindGamepad(function () {
                    btn1.setColor('white')
                })

                btn1.setColor('red')
            }, this)
    }

    update() {
        var keys = this.gamepad0.keys;
        var s = 'Key down: ';
        for (var name in keys) {
            if (keys[name].isDown) {
                s += `${name} `;
            }
        }
        this.print0.text = s;

        var keys = this.gamepad1.keys;
        var s = 'Key down: ';
        for (var name in keys) {
            if (keys[name].isDown) {
                s += `${name} `;
            }
        }
        this.print1.text = s;
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
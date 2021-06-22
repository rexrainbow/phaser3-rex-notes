import 'phaser';
import HitTest from '../../plugins/utils/input/HitTest.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.print = this.add.text(0, 0, '');

        var target = this.add.circle(400, 300, 20, 0xff0000);

        for (var i = 0; i < 3; i++) {
            var obj = this.add.rectangle(250, 300, 80, 80, 0xffffff, 0.3)
                .setInteractive();

            this.tweens.add({
                targets: obj,
                x: '+=300',
                repeat: -1,
                yoyo: true
            })
        }
    }

    update(time, delta) {
        var topOnly = true;
        if (this.input.activePointer.isDown) {
            var objs = HitTest(this, topOnly);
            if (objs.length > 0) {
                debugger
            }
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
    scene: Demo
};

var game = new Phaser.Game(config);
import 'phaser';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var target = this.add.circle(400, 300, 20, 0xff0000);
        var obj = this.add.rectangle(250, 300, 80, 80, 0xffffff)
            .setInteractive()
            .on('pointerover', function () {
                print.text += 'over\n';
            })
            .on('pointerout', function () {
                print.text += 'out\n';
            })
            .on('pointermove', function () {
                print.text += 'move\n';
            })

        this.tweens.add({
            targets: obj,
            x: '+=300',
            repeat: -1,
            yoyo: true
        })

        this.input.setPollAlways()
    }

    update(time, delta) {
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
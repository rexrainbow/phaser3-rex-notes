import Align from '../../plugins/utils/align/align/index.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var bg = this.add.rectangle(0, 0, 10, 10, 0x880088).setDisplaySize(300, 300).setOrigin(1);
        var obj = this.add.rectangle(0, 0, 10, 10, 0x008800).setDisplaySize(40, 40).setOrigin(1);

        Align.In.Center(bg, this.add.zone(400, 300, 800, 600));

        Align.In.TopLeft(obj, bg);
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
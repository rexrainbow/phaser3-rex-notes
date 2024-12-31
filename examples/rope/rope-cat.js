import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('cat', 'assets/images/rope-cat.png');
    }

    create() {
        var curve = new Phaser.Curves.Ellipse(0, 0, 200);
        var points = curve.getPoints(36);
        var cat = this.add.rope(400, 300, 'cat', undefined, points, true)

        // var graphics = this.add.graphics({
        //     lineStyle: { width: 2, color: 0xff0000 }
        // })
        // cat.setDebug(graphics)
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
};

var game = new Phaser.Game(config);
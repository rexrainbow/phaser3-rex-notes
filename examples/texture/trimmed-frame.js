import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('knight', 'assets/animations/knight.png', 'assets/animations/knight.json');
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: -1
        });

        this.gameObject = this.add.sprite(400, 300)
            .setScale(2)
            .play('idle')


        this.graphics = this.add.graphics();
        this.print = this.add.text(0, 0, '');
    }

    update() {
        this.graphics
            .lineStyle(2, 0x00ff00, 1)
            .strokeRectShape(this.gameObject.getBounds());

        var frame = this.gameObject.frame;
        var s = `\
CutSize: ${frame.cutWidth}x${frame.cutHeight}
RealSize: ${frame.realWidth}x${frame.realHeight}
`
        this.print.text = s;
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
    scene: Demo,
};

var game = new Phaser.Game(config);
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('cube', 'assets/animations/cube.png', 'assets/animations/cube.json');
    }

    create() {
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNames('cube', { prefix: 'frame', start: 0, end: 23 }),
            frameRate: 50,
            repeat: -1
        })

        this.add.sprite(400, 300, 'cube')
            .play('spin')
            .stopAfterDelay(1000)
    }

    update(time) { }
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
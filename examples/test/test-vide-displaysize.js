import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.video('test', './assets/video/test.mp4');
    }

    create() {
        var video = this.add.video(400, 300, 'test')
        video.setDisplaySize(640, 360)
        console.log('Create GO:', `${video.width}x${video.height}`, `${video.displayWidth}x${video.displayHeight}`)

        this.input.once('pointerdown', function () {
            video.play();
            console.log('Play:', `${video.width}x${video.height}`, `${video.displayWidth}x${video.displayHeight}`)
        })

        video.on('created', function () {
            console.log('Create Texture:', `${video.width}x${video.height}`, `${video.displayWidth}x${video.displayHeight}`)
        })
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
    scene: Demo
};

var game = new Phaser.Game(config);
import VideoPlugin from '../../plugins/video-plugin.js';
import LogMaxDelta from '../../plugins/utils/system/LogMaxDelta.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.video('test', './assets/video/test.mp4', 'canplaythrough', false, true);
    }

    create() {
        this.add.video(200, 300, 'test').setDisplaySize(400, 225);

        // var config = {
        //     width: 400,
        //     height: 225,
        //     src: './assets/video/test.mp4',
        //     autopPlay: true
        // };
        // var canvas = this.add.rexVideoCanvas(600, 300, config);
        // this.input.on('pointerdown', function () {
        //     if (canvas.isPaused) {
        //         canvas.play();
        //     } else {
        //         canvas.pause();
        //     }
        // });
    }

    update(time) {
        LogMaxDelta(time);
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
    plugins: {
        global: [
            {
                key: 'rexVideo',
                plugin: VideoPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
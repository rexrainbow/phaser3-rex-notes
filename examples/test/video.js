import VideoPlugin from '../../plugins/video-plugin.js';

class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        })
    }

    preload() {
    }

    create() {
        var textConfig = {
            backgroundColor: '#40241a'
        }

        var scene = this;
        var btn0 = this.add.text(0, 0, 'P3-Video', textConfig)
            .setInteractive()
            .on('pointerup', function () {
                scene.scene.launch('p3video')
                scene.scene.stop('videocanvas')
            })
        var btn1 = this.add.text(120, 0, 'Canvas-Video', textConfig)
            .setInteractive()
            .on('pointerup', function () {
                scene.scene.stop('p3video')
                scene.scene.launch('videocanvas')
            })


        this.scene.get('p3video').events
            .on('start', function () {
                btn0.setBackgroundColor('#6d4c41')
            })
            .on('shutdown', function () {
                btn0.setBackgroundColor('#40241a')
            })
        this.scene.get('videocanvas').events
            .on('start', function () {
                btn1.setBackgroundColor('#6d4c41')
            })
            .on('shutdown', function () {
                btn1.setBackgroundColor('#40241a')
            })
    }

    update(time) {
    }
}

class P3Video extends Phaser.Scene {
    constructor() {
        super({
            key: 'p3video'
        })
    }

    preload() {
        this.load.video('test', './assets/video/test.mp4', 'canplaythrough', false, true);
    }

    create() {
        console.log('create-p3video-scene')
        this.add.video(400, 300, 'test')
            .setDisplaySize(400, 225)
            .once('destroy', function () {
                console.log('destroy-p3video-obj')
            })
    }

    update(time) {
    }
}


class VideoCanvas extends Phaser.Scene {
    constructor() {
        super({
            key: 'videocanvas'
        })
    }

    preload() {
    }

    create() {
        console.log('create-videocanvas-scene')

        var canvas = this.add.rexVideoCanvas({
            x: 400, y: 300,
            width: 400,
            height: 225,
            src: './assets/video/test.mp4',
            autopPlay: true
        })
            .setInteractive()
            .on('pointerdown', function () {
                if (canvas.isPaused) {
                    canvas.play();
                } else {
                    canvas.pause();
                }
            })
            .once('destroy', function () {
                console.log('destroy-videocanvas-obj')
            })
    }

    update(time) {
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
    scene: [Menu, P3Video, VideoCanvas],
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
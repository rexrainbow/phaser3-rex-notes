import VideoPlugin from '../../plugins/video-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var video = this.add.rexVideo(400, 300, 800, 450, {
            src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
        });
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexVideo',
            plugin: VideoPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
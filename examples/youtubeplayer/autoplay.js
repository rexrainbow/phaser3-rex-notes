import 'phaser';
import YoutubePlayerPlugin from '../../plugins/youtubeplayer-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var youtubePlayer = this.add.rexYoutubePlayer(0, 0, 600, 450, {
            videoId: 'wDOym-mXxO4',
            autoPlay: true,
        })
            .on('ready', function () {
                youtubePlayer.setPosition(400, 300);
            })
            .on('statechange', function (player) {
                console.log(player.videoStateString);
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexYoutubePlayer',
            plugin: YoutubePlayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
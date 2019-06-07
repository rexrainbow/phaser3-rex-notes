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
        var youtubePlayer = this.add.rexYoutubePlayer(400, 300, 600, 450)
            .load('wDOym-mXxO4', true)
            .setLoop(true)
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
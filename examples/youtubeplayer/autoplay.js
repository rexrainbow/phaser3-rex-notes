import YoutubePlayerPlugin from '../../plugins/youtubeplayer-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { 
        this.load.script('youtube', 'https://www.youtube.com/iframe_api');
    }

    create() {
        var youtubePlayer = this.add.rexYoutubePlayer(400, 300, 400, 400, {
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
            key: 'rexYoutubePlayer',
            plugin: YoutubePlayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
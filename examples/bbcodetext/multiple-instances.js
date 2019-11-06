import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.add.rexBBCodeText(200, 300, '[b]AAA[/b]\nBBB', {
            fontSize: 20,
            backgroundColor: '#333333'
        })
            .setOrigin(0.5)

        this.add.rexBBCodeText(600, 300, '[b]AAA[/b]\nBBB', {
            fontSize: 40,
            backgroundColor: '#333333'
        })
            .setOrigin(0.5)
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
    plugins: {
        global: [{
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
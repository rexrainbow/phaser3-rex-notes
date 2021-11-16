import 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {      
    }

    create() {
        var s = `[color=red]red[/color]
[color=blue]blue[/color]
[color=green]green[/color]
Last line`;

        this.add.rexBBCodeText(0, 0, s, {
            fontSize: '30px',
            backgroundColor: '#888',
            backgroundColor2: '#222',
            backgroundHorizontalGradient: false,
            backgroundStrokeColor: 'red',
            backgroundStrokeLineWidth: 2,
            backgroundCornerRadius: 20,
            // backgroundCornerIteration: 0,
            padding: 20
        })
            .generateTexture('text')
            //.destroy()

        this.add.image(400, 300, 'text')

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
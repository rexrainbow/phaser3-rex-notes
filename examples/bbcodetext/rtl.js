import 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.add.text(
            400, 250,
            'יא פרו...',
            {
                fixedWidth: 200, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                rtl: true
            }
        );

        this.add.rexBBCodeText(
            400, 350,
            'יא פרו.[color=red].[color=blue].',
            {
                fixedWidth: 200, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                backgroundCornerRadius: 10,
                // align: 'center',
                rtl: true
            }
        );
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
import 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('key', 'assets/images/key.png');
    }

    create() {
        var s1 = 'See loooooonnnnnggg words ABC ABC ABC ABC ABC ABC';

        // Built-in character wrap
        this.add.rexBBCodeText(100, 30, s1, {
            fixedWidth: 180,
            backgroundColor: '#555',
            fontSize: '20px',
            wrap: {
                mode: 'char',
                width: 180
            },
        });

        // Built-in word wrap
        this.add.rexBBCodeText(300, 30, s1, {
            fixedWidth: 180,
            backgroundColor: '#555',
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: 180
            },
        });

        // Custom wrap callback
        this.add.rexBBCodeText(100, 300, s1, {
            fixedWidth: 180,
            backgroundColor: '#555',
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: 180,
                callback: function (text, getTextWidth, wrapWidth, offset) {
                    return text.split(' ');
                }
            },
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
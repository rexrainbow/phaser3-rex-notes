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
        var s1 = `This is a [img=key]`;
        var text = this.add.rexBBCodeText(100, 100, '', {
            backgroundColor: '#555',
            fontSize: '36px',

            stroke: 'red',
            strokeThickness: 1,
            shadow: {
                offsetX: 5,
                offsetY: 5,
                blur: 5,
                color: 'yellow'
            },

            underline: {
                color: '#000',
                thickness: 2,
                offset: 1
            }
        })
            .addImage('key')
            .setText(s1)

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
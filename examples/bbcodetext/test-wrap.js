import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var s = `AAA AAA [b]BBBBBBBBBB[/b] CCC CCC`;
        this.add.rexBBCodeText(400, 300, s, {
            wrap: { mode: 'word', width: 100 },
            backgroundColor: 'grey'
        })

        var s = `AAA AAA [b]BBBBBBBBBB [/b]CCC CCC`;
        this.add.rexBBCodeText(400, 400, s, {
            wrap: { mode: 'word', width: 100 },
            backgroundColor: 'grey'
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
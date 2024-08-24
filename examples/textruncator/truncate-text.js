import phaser from 'phaser/src/phaser.js';
import TextTruncatorPlugin from '../../plugins/texttruncator-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var txt = this.add.text(300, 300, '', {
            backgroundColor: 'grey',
            padding: { left: 5, right: 5, top: 5, bootom: 5 }
        });
        var truncator = this.plugins.get('rexTextTruncator').add(txt, {
            maxWidth: 200,
            symbol: ' ...'
        })

        truncator.setText('AAAABBBB, CCCCDDDD, EEEEFFFFF')
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
            key: 'rexTextTruncator',
            plugin: TextTruncatorPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
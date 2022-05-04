import phaser from 'phaser/src/phaser.js';
import ClickOutsidePlugin from '../../plugins/clickoutside-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var btn = this.add.rectangle(400, 300, 120, 120, 0x00cccc)
            .on('pointerdown', function () {
                print.text += 'Click\n'
            })

        var clickOtuside = this.plugins.get('rexClickOutside').add(btn, {
            mode: 'pointerdown'
        })
            .on('clickoutside', function () {
                print.text += 'Click outside\n'
            })

    }
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
            key: 'rexClickOutside',
            plugin: ClickOutsidePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
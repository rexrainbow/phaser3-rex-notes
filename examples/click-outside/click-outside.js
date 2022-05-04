import phaser from 'phaser/src/phaser.js';
import ClickOutsidePlugin from '../../plugins/clickoutside-plugin';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var btn0 = this.add.rectangle(400, 300, 200, 200, COLOR_PRIMARY)
            .setInteractive()
            .on('pointerdown', function () {
                print.text += 'Click btn0\n';
            })
        var btn1 = this.add.rectangle(450, 300, 100, 100, COLOR_DARK)
            .setInteractive()
            .on('pointerdown', function () {
                print.text += 'Click btn1\n';
            })

        var clickOtuside = this.plugins.get('rexClickOutside').add(btn0, {
            mode: 'pointerdown'
        })
            .on('clickoutside', function () {
                print.text += 'Click outside of btn0\n'
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
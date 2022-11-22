import phaser from 'phaser/src/phaser.js';
import ScrollerPlugin from '../../plugins/scroller-plugin.js';

const linesCount = 300;

const pad = Phaser.Utils.String.Pad;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var s = '';
        for (var i = 0; i < linesCount; i++) {
            s += pad(i.toString(), 4, '0', 1);
            if (i < (linesCount - 1)) {
                s += '\n';
            }
        }

        var txt = this.add.bitmapText(0, 0, 'gothic', s).setOrigin(0, 0);

        var bg = this.add.rectangle(0, 0, 800, txt.height, 0xff0000).setOrigin(0, 0).setAlpha(0.2);

        var bottomBound = txt.height;
        var topBound = 0;
        var cam = this.cameras.main;

        this.plugins.get('rexScroller').add(bg, {
            bounds: [
                bottomBound,
                topBound
            ],
            dragReverse: true,
            value: 0,
            valuechangeCallback: function (value) {                
                cam.scrollY = value;
            }
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
    backgroundColor: 0x333333,
    plugins: {
        global: [{
            key: 'rexScroller',
            plugin: ScrollerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
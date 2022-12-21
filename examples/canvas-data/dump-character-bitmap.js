import phaser from 'phaser/src/phaser.js';
import CanvasDataPlugin from '../../plugins/canvasdata-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {
    }

    create() {
        var txt = this.add.rexBBCodeText(0, 0, '樂', {
            fixedWidth: 32, fixedHeight: 32,
            fontSize: 32,
            halign: 'center', valign: 'center',
            testString: '樂'
        });

        var dumpResult = '';
        var canvasData = this.plugins.get('rexCanvasData').textObjectToBitmap(txt);
        for (var y = 0; y < canvasData.height; y++) {
            for (var x = 0; x < canvasData.width; x++) {
                dumpResult += canvasData.get(x, y) ? '1' : '0';
            }
            dumpResult += '\n'
        }
        var print = this.add.text(0, 40, dumpResult);

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
        global: [
            {
                key: 'rexCanvasData',
                plugin: CanvasDataPlugin,
                start: true
            },
            {
                key: 'BBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
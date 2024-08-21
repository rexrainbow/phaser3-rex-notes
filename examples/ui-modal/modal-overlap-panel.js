import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const COLOR_BLUE = 0x00FF00;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // NG case
        this.createScroll(400, 300, 400, 400, false);
        this.createTextArea(400, 300, 200, 200, true);

        // OK case
        // this.createTextArea(400,300,400,400, false);
        // this.createTextArea(400,300,200,200, true);
    }

    update() { }


    createScroll(x, y, width, height, modal) {
        let panel = this.rexUI.add.scrollablePanel({
            x: x,
            y: y,
            width: width,
            height: height,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY).setStrokeStyle(5, COLOR_LIGHT),

            panel: {
                child: this.add.text(0, 0, 'scrollPanel\nscrollPanel\nscrollPanel', { fontSize: 18 }),
                //mask: {padding: 1},
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: { left: 10, right: 10, top: 10, bottom: 10 }
        })
            .layout()

        if (modal) { panel.modal({ cover: { color: 0x0, alpha: 0.5, } }); }
    }


    createTextArea(x, y, width, height, modal) {
        let area = this.rexUI.add.textArea({
            x: x,
            y: y,
            width: width,
            height: height,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY).setStrokeStyle(5, COLOR_LIGHT),

            //text: this.add.text(),
            text: this.rexUI.add.BBCodeText(),
            // textMask: true,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: { left: 10, right: 10, top: 10, bottom: 10, },

            content: 'textArea\ntextArea\ntextArea',
        })
            .layout()

        if (modal) { area.modal({ cover: { color: 0x0, alpha: 0.5, } }); }
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);
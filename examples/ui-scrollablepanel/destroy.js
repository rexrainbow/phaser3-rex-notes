import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            height: 320,

            scrollMode: 'y',

            background: this.rexUI.add.roundRectangle({
                strokeColor: COLOR_LIGHT,
                radius: 10
            }),

            panel: {
                child: createPanel(this),

                mask: { padding: 1, },
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, radius: 10, color: COLOR_DARK }),
                thumb: this.rexUI.add.roundRectangle({ radius: 13, color: COLOR_LIGHT })
            },

            header: this.rexUI.add.label({
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: this.rexUI.add.roundRectangle({ color: COLOR_PRIMARY }),
                text: this.add.text(0, 0, 'Header', { fontSize: 20 })
            }),

            footer: this.rexUI.add.label({
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: this.rexUI.add.roundRectangle({ color: COLOR_PRIMARY }),
                text: this.add.text(0, 0, 'Footer', { fontSize: 20 })
            }),

            space: { left: 20, right: 20, top: 20, bottom: 20, panel: 3, header: 5, footer: 5 }
        })
            .layout()

        scrollablePanel.destroy();
    }

    update() { }
}

var createPanel = function (scene) {
    var sizer = scene.rexUI.add.sizer({
        width: 120,
        orientation: 'y',
        space: { item: 3 }
    })

    for (var i = 0; i < 30; i++) {
        sizer.add(
            scene.rexUI.add.label({
                height: 60,
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: scene.rexUI.add.roundRectangle({ color: COLOR_DARK, strokeColor: COLOR_LIGHT, radius: 10 }),
                text: scene.add.text(0, 0, `Item ${i}`, { fontSize: 20 })
            }),
            { expand: true }
        )
    }

    return sizer;
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
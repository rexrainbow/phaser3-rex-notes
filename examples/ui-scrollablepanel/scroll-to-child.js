import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var orientation = 'y';

        var panel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: (orientation === 'y') ? undefined : 600,
            height: (orientation === 'y') ? 400 : undefined,

            scrollMode: (orientation === 'y') ? 0 : 1,

            background: this.rexUI.add.roundRectangle({ strokeColor: 0xff0000, strokeWidth: 2 }),
            panel: {
                child: CreatePanel(this, orientation),
            },

            header: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'H'),
            }),

            footer: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'F'),
            }),

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, height: 20, radius: 10, color: COLOR_DARK }),
                thumb: this.rexUI.add.roundRectangle({ radius: 13, color: COLOR_LIGHT }),
            },

            space: {
                panel: { right: 4, top: 30, bottom: 30 },
                header: 5,
                footer: 5
            }
        })
            .layout()

        panel.scrollToChild(panel.getByName('item-20', true));
    }

    update() { }
}

var CreatePanel = function (scene, orientation) {
    var panel = scene.rexUI.add.sizer({
        width: 100,
        orientation: orientation,
        space: { item: 4 }
    })

    for (var i = 0; i < 50; i++) {
        var name = `item-${i}`;
        var label = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle({
                color: COLOR_MAIN
            }),
            text: scene.add.text(0, 0, name),
            space: { left: 10, right: 10, top: 10, bottom: 10 },
            name: name,
        })
        panel.add(label, { expand: true });
    }

    return panel;
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
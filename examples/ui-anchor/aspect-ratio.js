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

    preload() { }

    create() {
        var sizer = this.rexUI.add.scrollablePanel({
            anchor: {
                x: 'center',
                y: 'center',
                width: '30%',
                aspectRatio: 0.75
            },

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10).setStrokeStyle(2, COLOR_DARK),
            panel: {
                child: CreateLabelList(this, 100),

                mask: {
                    padding: 1
                },
            },

            space: { left: 10, right: 10, top: 10, bottom: 10 }
        })
            .layout();
    }

    update() { }
}

var CreateLabelList = function (scene, count) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 8, }
    })
    for (var i = 0; i < count; i++) {
        var label = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),
            text: scene.add.text(0, 0, `Item-${i}`, {
                fontSize: '24px'
            }),
            expandTextWidth: true,
            icon: scene.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),
            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 5 }
        })
        sizer.add(
            label,
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
        mode: Phaser.Scale.RESIZE, // ENVELOP
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
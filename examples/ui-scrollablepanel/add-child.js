import 'phaser';
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

    preload() {
    }

    create() {
        var panel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: 600,

            scrollMode: 1,

            panel: {
                child: CreatePanel(this),
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },
        })
            .layout()


        // Add new child
        panel
            .getElement('panel')
            .add(
                CreatePaper(this,
                    'GGGG',
                    this.rexUI.add.roundRectangle(0, 0, 200, 400, 20, COLOR_PRIMARY))
            );

        // Layout scrollable panel again
        panel.layout();

    }

    update() { }
}

var CreatePanel = function (scene) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'x',
        space: { item: 50, top: 20, bottom: 20 }
    })

    var contentList = ['AAAA', 'BBBB', 'CCCC', 'DDDDD', 'EEEEE', 'FFFFF'];
    for (var i = 0, cnt = contentList.length; i < cnt; i++) {
        panel
            .add(
                CreatePaper(scene,
                    contentList[i],
                    scene.rexUI.add.roundRectangle(0, 0, 200, 400, 20, COLOR_PRIMARY))
            )
    }

    return panel;
}

var CreatePaper = function (scene, content, background) {
    return scene.rexUI.add.label({
        orientation: 'y',
        width: background.displayWidth,
        height: background.displayHeight,

        background: background,
        text: scene.add.text(0, 0, content),

        align: 'center'
    })
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
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
        this.rexUI.add.gridSizer({
            x: 400, y: 300,
            width: 800, height: 600,
            column: 2, row: 2,

            columnProportions: 1, rowProportions: 1,
            space: {
                column: 10, row: 10,
            }
        })
            .add(
                CreateHolyGrail(this, 0),
                { column: 0, row: 0, expand: true }
            )
            .add(
                CreateHolyGrail(this, 1),
                { column: 1, row: 0, expand: true }
            )
            .add(
                CreateHolyGrail(this, 2),
                { column: 0, row: 1, expand: true }
            )
            .add(
                CreateHolyGrail(this, 3),
                { column: 1, row: 1, expand: true }
            )
            .layout()

    }

    update() { }
}

var CreateHolyGrail = function (scene, layoutMode) {
    return scene.rexUI.add.holyGrail({
        layoutMode: layoutMode,

        header: scene.add.rectangle(0, 0, 10, 30, COLOR_MAIN), // Fixed height
        leftSide: scene.add.rectangle(0, 0, 70, 10, COLOR_LIGHT), // Fixed width
        content: scene.add.rectangle(0, 0, 30, 20, COLOR_DARK),
        rightSide: scene.add.rectangle(0, 0, 50, 10, COLOR_LIGHT), // Fixed width
        footer: scene.add.rectangle(0, 0, 10, 30, COLOR_MAIN),// Fixed height

        space: {
            header: 10,
            footer: 10,
            leftSide: 10,
            rightSide: 10
        }
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
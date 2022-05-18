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
        // Setup grid-sizer
        var gridSizer = this.rexUI.add.gridSizer({
            x: 300, y: 100,
            width: 300, height: undefined,

            column: 2, row: 2,
            columnProportions: [0, 1], rowProportions: 0,
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                column: 5,
                row: 5
            },
        })
            .setOrigin(0)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 0, COLOR_DARK))

        for (var r = 0; r < gridSizer.rowCount; r++) {
            // Each row has 2 columns
            gridSizer
                .add(
                    this.add.text(0, 0, Math.floor(Math.random() * 1000).toString()),
                    { expand: false, align: 'center' }
                )
                .add(
                    this.rexUI.add.roundRectangle(0, 0, 1, 1, 5).setStrokeStyle(2, COLOR_PRIMARY),
                    { expand: true }
                )
        }
        gridSizer.layout();

        // Add new row
        this.input.on('pointerup', function () {
            // Each row has 2 columns
            gridSizer
                .add(
                    this.add.text(0, 0, Math.floor(Math.random() * 1000).toString()),
                    { expand: false, align: 'center' }
                )
                .add(
                    this.rexUI.add.roundRectangle(0, 0, 1, 1, 5).setStrokeStyle(2, COLOR_PRIMARY),
                    { expand: true }
                )
                .layout()
        }, this)
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
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);
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
            x: 100, y: 100,
            width: undefined, height: 300,

            column: 2, row: 2,
            columnProportions: 0, rowProportions: [0, 1],
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                column: 5,
                row: 5
            },
        })
            .setOrigin(0)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 1, 1, 0, COLOR_DARK))

        for (var r = 0; r < gridSizer.rowCount; r++) {
            AddColumnItems(gridSizer)
        }
        gridSizer.layout();

        // Add new row
        this.input.on('pointerup', function () {
            // Each column has 2 rows
            AddColumnItems(gridSizer);
            gridSizer.layout();
        }, this)
    }

    update() { }
}

var AddColumnItems = function (gridSizer) {
    var scene = gridSizer.scene;
    // Each column has 2 rows
    gridSizer
        .add(
            scene.add.text(0, 0, Math.floor(Math.random() * 1000).toString()),
            { row: true, expand: false, align: 'center' }
        )
        .add(
            scene.rexUI.add.roundRectangle(0, 0, 1, 1, 5).setStrokeStyle(2, COLOR_PRIMARY),
            { row: true, expand: true }
        )
    return gridSizer;
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
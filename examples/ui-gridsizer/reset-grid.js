import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.gridSizer({
            x: 400, y: 300,
            column: 3, row: 3,
            space: {
                // top: 20, bottom: 20, left: 10, right: 10,
                column: 1, row: 1
            },

            createCellContainerCallback: function (scene, x, y, config) {
                var gameObject = scene.rexUI.add.roundRectangle(0, 0, 50, 50, 14, 0xa4d4ff);

                return gameObject;
            }
        })
            .layout()

        sizer.resetGrid(5, 5, 0, 0, { column: 10, row: 10 }).layout()

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
import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const RandomInt = Phaser.Math.Between;

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
            column: 4, row: 4,
            space: {
                // top: 20, bottom: 20, left: 10, right: 10,
                column: 4, row: 4
            },

            createCellContainerCallback: function (scene, x, y, config) {
                var gameObject = scene.rexUI.add.roundRectangle(0, 0, 50, 50, 14, 0xa4d4ff);

                gameObject
                    .setInteractive()
                    .on('pointerdown', gameObject.destroy, gameObject);

                return gameObject;
            }
        })
            .layout()

        sizer.removeAt(0, 0, true);
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
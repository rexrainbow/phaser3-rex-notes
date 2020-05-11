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
            width: 400, height: 400,
            column: 3, row: 3,
            columnProportions: 1, rowProportions: 1,
            space: {
                top: 20, bottom: 20, left: 10, right: 10,
                column: 20, row: 10
            }
        })
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                sizer.add(
                    this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, RandomInt(0, 0x1000000)), // child
                    i, // columnIndex
                    j, // rowIndex
                    'center', // align
                    0, // paddingConfig
                    true, // expand
                )
            }
        }
        sizer.layout();
        sizer.drawBounds(this.add.graphics(), 0xff0000);
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
import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gridSizer = this.rexUI.add.gridSizer({
            x: 400, y: 300,
            width: 400, height: 400,
            column: 3, row: 3,
            columnProportions: 1,
            rowProportions: 1,
        })
            .add(CreateLabel(this, 0x003d33),
                { column: 1, row: 1, expand: true }
            )
            .add(CreateLabel(this, 0x78002e),
                { column: 0, row: 1, expand: true }
            )
            .add(CreateLabel(this, 0x8e0000),
                { column: 1, row: 0, expand: true }
            )
            .add(CreateLabel(this, 0x005005),
                { column: 1, row: 2, expand: true }
            )
            .add(CreateLabel(this, 0x004c8c),
                { column: 2, row: 1, expand: true }
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var CreateLabel = function (scene, backgroundColor) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            color: backgroundColor
        })
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
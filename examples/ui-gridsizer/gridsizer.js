import UIPlugin from '../../templates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var gridSizer = this.rexUI.add.gridSizer(400, 300, undefined, undefined, 3, 3)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 20, 0x29434e))
            .add(this.rexUI.add.roundRectangle(0, 0, 200, 200, 20, 0x003d33),
                1, 1,
            )
            .add(this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x78002e),
                0, 1,
            )
            .add(this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x8e0000),
                1, 0,
            )
            .add(this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x005005),
                1, 2,
            )
            .add(this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x004c8c),
                2, 1,
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
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
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var gridTable = this.rexUI.add.gridTable({
                x: 400,
                y: 300,
                width: 250,
                height: 400,

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 5, 0x1976d2),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 18, 20, 9, 0x63a4ff)
                }
            })
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
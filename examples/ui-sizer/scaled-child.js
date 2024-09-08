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
        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 10
            }
        })
            .addBackground(this.rexUI.add.roundRectangle({ color: 0x888888 }))

        for (var i = 0; i < 2; i++) {
            var child = this.rexUI.add.overlapSizer({
                width: 80, height: 80,
            })
                .addBackground(this.rexUI.add.roundRectangle({ color: 0x880000 }))
                .setScale(0.75)

            sizer.add(child);
        }

        sizer.layout();
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
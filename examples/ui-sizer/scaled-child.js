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
        var scaleBeforeAddingChild = true;

        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 10
            }
        })

        // Scale before adding child
        if (scaleBeforeAddingChild) {
            sizer.setScale(0.5);
        }

        sizer
            .addBackground(this.rexUI.add.roundRectangle({ color: 0x888888 }))

            // Add child
            .add(
                this.rexUI.add.overlapSizer({
                    width: 200, height: 200,
                })
                    .addBackground(this.rexUI.add.roundRectangle({ color: 0x880000 }))
                    .setScale(0.5)
                // displaySize = 100x100, since scale=0.5
            )

            // Add child
            .add(
                this.rexUI.add.overlapSizer({
                    width: 200, height: 200,
                })
                    .addBackground(this.rexUI.add.roundRectangle({ color: 0x880000 }))
                    .setScale(0.5)
                // displaySize = 100x100, since scale=0.5
            )

        // Scale after adding child
        if (!scaleBeforeAddingChild) {
            sizer.setScale(0.5);
            // Will affect size of all children
        }

        sizer
            .layout();


        console.log(sizer.displayWidth, sizer.displayHeight)
        // DisplayWidth = 215, 100+100(child height*2) + 5(space.left) + 5(space.right) + 5(space.item)
        // DisplayHeight = 110, 100(child height) + 5(space.top) + 5(space.bottom)

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
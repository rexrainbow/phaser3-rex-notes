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
        this.add
            .rectangle(160, 160, 240, 360)
            .setFillStyle(0x880000)
            .setOrigin(0, 0);

        var sizer = this.rexUI.add.sizer({
            orientation: 'y',
            x: 160,
            y: 160,
            width: 240,
            height: 360,
            origin: 0,
        })
            .addBackground(
                this.add
                    .rectangle(0, 0, 0, 0)
                    .setFillStyle(0x008800)
                    .setOrigin(0, 0),
            )

        for (let i = 0; i < 6; i++) {
            let child = this.add.text(0, 0, `${i} TEXT`, {
                fixedWidth: 240,
                fixedHeight: 40,
                backgroundColor: 'grey'
            })

            sizer.add(
                this.add.container()
                    .add(child)
                    .setSize(240, 40),
                { offsetOriginX: -0.5, offsetOriginY: -0.5 }
            );
        }

        sizer.layout()

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
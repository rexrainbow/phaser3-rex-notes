import phaser from 'phaser/src/phaser.js';
import DropShadowPipelinePlugin from '../../plugins/dropshadowpipeline-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.add.rectangle(0, 0, 1424, 800, 0xffff00).setOrigin(0, 0)
        var obj = this.add.rectangle(100, 100, 200, 200, 0x00ff00).setOrigin(0, 0);

        this.plugins.get("rexDropShadowPipeline").add(obj, {
            angle: -45, // degrees
            distance: 8,
            shadowColor: 0x000000,
            alpha: 0.75,
            blur: 4,
            pixelWidth: 1,
            pixelHeight: 1,
        });
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
        global: [
            {
                key: 'rexDropShadowPipeline',
                plugin: DropShadowPipelinePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
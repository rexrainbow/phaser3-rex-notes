import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        this.cameras.main.setZoom(0.5).setScroll(-100, -100);

        var graphics = this.add.graphics();
        var drawViewport = function () {
            graphics
                .clear()
                .lineStyle(10, 0xff0000)
                .strokeRectShape(graphics.scene.rexUI.viewport)
        }
        this.scale.on('resize', drawViewport);
        drawViewport();
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
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
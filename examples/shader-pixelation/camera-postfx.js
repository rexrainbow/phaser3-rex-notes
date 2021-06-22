import 'phaser';
import PixelationPipelinePlugin from '../../plugins/pixelationpipeline-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {        
    }

    create() {
        const Between = Phaser.Math.Between;
        for (var i = 0; i < 100; i++) {
            this.add.circle(0, 0, Between(5, 30), Between(0, 0x1000000))
                .setRandomPosition(100, 100, 600, 400)
                .setAlpha(Math.random());
        }

        var postFxPlugin = this.plugins.get('rexPixelationPipeline');
        this.cameraFilter = postFxPlugin.add(this.cameras.main);

        var scene = this;
        this.input.on('pointerup', function (pointer, currentlyOver) {
            scene.tweens.add({
                targets: scene.cameraFilter,
                pixelWidth: 0,
                pixelHeight: 0,
                ease: 'Linear',
                duration: 1000,
                repeat: 0,
                yoyo: false
            });
        });
    }

    update() {
        var activePointer = this.input.activePointer;
        if (activePointer.isDown) {
            this.cameraFilter.pixelWidth += 1;
            this.cameraFilter.pixelHeight += 1;
        }
    }
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
        global: [{
            key: 'rexPixelationPipeline',
            plugin: PixelationPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
import InversePipelinePlugin from '../../plugins/inversepipeline-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        drawSomething(this);

        var customPipeline = this.plugins.get('rexInversePipeline').add(this, 'Inverse');
        this.cameras.main.setRenderToTexture(customPipeline);
        this.cameraFilter = customPipeline;

        var scene = this;
        this.input.on('pointerup', function (pointer, currentlyOver) {
            scene.tweens.add({
                targets: customPipeline,
                intensity: 0,
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
            this.cameraFilter.intensity += 0.01;
        }
    }
}

const Between = Phaser.Math.Between;

var drawSomething = function (scene) {
    var graphics = scene.add.graphics();
    var camera = scene.cameras.main;
    var w = camera.width,
        h = camera.height;
    for (var i = 0; i < 1000; i++) {
        graphics
            .fillStyle(Between(0, 0x1000000), Math.random())
            .fillCircle(Between(0, w), Between(0, w), Between(5, 30));
    }

    var rt = scene.add.renderTexture(0, 0, w, h);
    rt.draw(graphics, 0, 0);
    graphics.destroy();
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
            key: 'rexInversePipeline',
            plugin: InversePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
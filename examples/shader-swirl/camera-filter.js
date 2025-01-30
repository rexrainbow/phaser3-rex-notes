import phaser from '../../../phaser/src/phaser.js';
import SwirlFilterPlugin from '../../plugins/swirlfilter-plugin.js';

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

        var camera = this.cameras.main;
        var controller = this.plugins.get('rexSwirlFilter').add(camera, {
        })

        var scene = this;
        this.input.on('pointerup', function (pointer) {
            scene.tweens.add({
                targets: controller,
                angle: 0,
                radius: 0,
                ease: 'Linear',
                duration: 1000,
                repeat: 0,
                yoyo: false
            });
        });

        this.cameraSwirlFilter = controller;
    }

    update() {
        var activePointer = this.input.activePointer;
        if (activePointer.isDown) {
            this.cameraSwirlFilter.angle += 1;
            this.cameraSwirlFilter.radius += 5;
            this.cameraSwirlFilter.setCenter(activePointer.x, activePointer.y);
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
            key: 'rexSwirlFilter',
            plugin: SwirlFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
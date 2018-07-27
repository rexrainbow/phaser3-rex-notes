'use strict'

import ContainerLitePlugin from 'rexPlugins/containerlite-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {;
        this.images = [
            this.add.image(100, 200, 'mushroom'),
            this.add.image(140, 340, 'mushroom').setAngle(45)
        ]
        this.children = [
            this.add.rexContainerLite(30, 40).add(this.images[0]),
            this.add.rexContainerLite(50, 60).add(this.images[1])
        ];

        this.containerLite = this.add.rexContainerLite(100, 300, 100, 100)
            .addMultiple(this.children);

        // test x, scale, angle, alpha
        this.tweens.add({
            targets: this.containerLite,
            props: {
                x: {
                    value: '+=300'
                },
                scaleX: {
                    value: '+=1'
                },
                scaleY: {
                    value: '+=1'
                },
                angle: {
                    value: '+=360'
                },
                alpha: {
                    value: '-=1'
                }
            },
            duration: 6000,
            repeat: -1,
            yoyo: true
        });

        // test visible
        var scene = this;
        this.input.on('pointerup', function () {
            //scene.containerLite.visible = !scene.containerLite.visible;
            scene.containerLite.toggleFlipY();
        });

        this.lines = this.add.graphics();
        this.update();
    }

    update() {
        this.lines
            .clear()
            .lineStyle(2, 0x00ffff, 1);

        var gameObject;
        for (var i = 0, cnt = this.images.length; i < cnt; i++) {
            gameObject = this.images[i];
            this.lines.lineBetween(this.containerLite.x, this.containerLite.y, gameObject.x, gameObject.y);
        }
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexContainerLite',
            plugin: ContainerLitePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
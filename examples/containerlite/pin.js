'use strict'

import ContainerLitePlugin from 'rexPlugins/containerlite-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.child = this.add.graphics()
            .fillStyle(0xcccccc, 1)
            .fillRect(0, 0, 40, 40)
            .setPosition(100, 200);
        this.containerLite = this.add.rexContainerLite(100, 300)
            .add(this.child);

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
            duration: 4000,
            repeat: -1,
            yoyo: true
        });

        // test visible
        var scene = this;
        this.input.on('pointerup', function () {
            scene.containerLite.visible = !scene.containerLite.visible;
        });

        this.line = this.add.graphics();
        this.update();
    }

    update() {
        this.line
            .clear()
            .lineStyle(2, 0x00ffff, 1)
            .lineBetween(this.containerLite.x, this.containerLite.y, this.child.x, this.child.y);
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
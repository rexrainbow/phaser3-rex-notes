'use strict'

import ContainerPlugin from 'rexPlugins/container-plugin.js';

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
            .setPosition(200, 100);
        this.container = this.add.rexContainer(200, 200)
            .add(this.child);
        this.line = this.add.graphics()
            .lineStyle(2, 0x00ffff, 1)
            .lineBetween(this.container.x, this.container.y, this.child.x, this.child.y);
    }

    update() {
        this.container.angle++;
        this.line
            .clear()
            .lineStyle(2, 0x00ffff, 1)
            .lineBetween(this.container.x, this.container.y, this.child.x, this.child.y);
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
            key: 'rexContainer',
            plugin: ContainerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
'use strict'

import SwirlPipelinePlugin from 'rexPlugins/swirlpipeline-plugin.js'
import drawSomething from './drawSomething.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        drawSomething(this);
        var pipe = this.plugins.get('rexSwirlPipeline').add(this, 'Swirl');
        this.cameras.main.setRenderToTexture(pipe);
        this.cameraFilter = pipe;

        var scene = this;
        this.input.on('pointerup', function(pointer, currentlyOver){
            scene.tweens.add({
                targets: pipe,
                angle: 0,
                radius: 0,
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
            this.cameraFilter.angle += 1;
            this.cameraFilter.radius += 5;
            this.cameraFilter.setCenter(activePointer.x, activePointer.y);
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
            key: 'rexSwirlPipeline',
            plugin: SwirlPipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
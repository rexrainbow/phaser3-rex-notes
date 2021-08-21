import 'phaser';
import DissolvePipelinePlugin from '../../plugins/dissolvepipeline-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        var postFxPlugin = this.plugins.get('rexDissolvePipelinePlugin');
        var gameObject = this.add.image(400, 300, 'classroom');
        var postFxPipeline = postFxPlugin.add(gameObject, {
           
        });

        var tweenTask;
        this.input.on('pointerdown', function () {
            if (tweenTask) {
                tweenTask.stop();
            }

            var key = gameObject.texture.key;
            var nextKey = (key === 'classroom') ? 'road' : 'classroom';
            postFxPipeline.setTransitionTargetTexture(nextKey).setProgress(0);
            tweenTask = this.tweens.add({
                targets: postFxPipeline,
                progress: 1,
                ease: 'Quad',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 3000,
                repeat: 0,            // -1: infinity
                yoyo: false
            })
                .on('complete', function () {
                    postFxPipeline.setProgress(0);
                    gameObject.setTexture(nextKey);
                    tweenTask = undefined;
                })
        }, this)

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'noiseX', 0, 100);
        gui.add(postFxPipeline, 'noiseY', 0, 100);
        gui.add(postFxPipeline, 'noiseZ', 0, 100);
        gui.add(postFxPipeline, 'fromEdgeStart', 0, 1);
        gui.add(postFxPipeline, 'fromEdgeWidth', 0, 1);
    }

    update() {
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
            key: 'rexDissolvePipelinePlugin',
            plugin: DissolvePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
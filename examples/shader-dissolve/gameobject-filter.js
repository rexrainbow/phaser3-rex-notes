import phaser from '../../../phaser/src/phaser.js';
import { DisolveFilter, DissolveController } from '../../plugins/dissolvefilter.js';
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

        if (!this.renderer.renderNodes.hasNode(DisolveFilter.FilterName)) {
            this.renderer.renderNodes.addNodeConstructor(DisolveFilter.FilterName, DisolveFilter);
        }
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom');

        var box = this.add.renderFilters(gameObject);
        var filterList = box.filters.internal;
        var controller = filterList.add(
            new DissolveController(box.camera)
        );

        var tweenTask;
        this.input.on('pointerdown', function () {
            if (tweenTask) {
                tweenTask.complete();
            }

            var key = gameObject.texture.key;
            var nextKey = (key === 'classroom') ? 'road' : 'classroom';
            controller.setTransitionTargetTexture(nextKey).setProgress(0);
            tweenTask = this.tweens.add({
                targets: controller,
                progress: 1,
                ease: 'Quad',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 3000,
                repeat: 0,            // -1: infinity
                yoyo: false
            })
                .on('complete', function () {
                    controller.setProgress(0);
                    gameObject.setTexture(nextKey);
                    tweenTask = undefined;
                })
        }, this)

        var gui = new Dat.GUI();
        gui.add(controller, 'noiseX', 0, 100);
        gui.add(controller, 'noiseY', 0, 100);
        gui.add(controller, 'noiseZ', 0, 100);
        gui.add(controller, 'fromEdgeStart', 0, 1);
        gui.add(controller, 'fromEdgeWidth', 0, 1);
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
};

var game = new Phaser.Game(config);
import 'phaser';
import KawaseBlurPipeline from '../../plugins/kawaseblurpipeline';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom');

        this.cameras.main.setPostPipeline(KawaseBlurPipeline);
        var postFxPipeline = this.cameras.main.getPostPipeline(KawaseBlurPipeline) as KawaseBlurPipeline;
        postFxPipeline.resetFromJSON({
            blur: 4,
            quality: 3
        })

        var gui = new Dat.GUI();
        gui.add(postFxPipeline, 'blur', 0, 30);
        gui.add(postFxPipeline, 'pixelWidth', 0, 600);
        gui.add(postFxPipeline, 'pixelHeight', 0, 800);
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
    pipeline: <any>[KawaseBlurPipeline]
};

var game = new Phaser.Game(config);
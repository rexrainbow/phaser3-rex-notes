import phaser from 'phaser/src/phaser.js';
import LayerManager from '../../plugins/utils/layer/layermanager/LayerManager.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.layers = new LayerManager(this, {
            layers: [
                'layer0',
                'layer1'
            ]
        });

        var gameObject = this.add.circle(400, 300, 20, 0xff0000);
        this.layers.addToLayer('layer1', gameObject);

    }

    update() { }
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
    scene: Demo
};

var game = new Phaser.Game(config);
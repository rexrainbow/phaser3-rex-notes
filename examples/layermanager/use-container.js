import phaser from 'phaser/src/phaser.js';
import LayerManagerPlugin from '../../plugins/layermanager-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.layers = this.plugins.get('rexLayerManager').add(this, {
            layers: ['layer0', 'layer1'],
            useContainer: true
        });

        var gameObject1 = this.add.circle(400, 300, 20, 0xff0000);
        this.layers.addToLayer('layer1', gameObject1);

        var gameObject0 = this.add.circle(400, 300, 30, 0x00ff00);
        this.layers.addToLayer('layer0', gameObject0);

        this.layers.moveLayerAbove('layer0', 'layer1')
        var layer0 = this.layers.getLayer('layer0').setPosition(-30, 0)
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexLayerManager',
            plugin: LayerManagerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
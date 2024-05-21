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
        // Will add new camera if target camera is not existing
        this.layers = this.plugins.get('rexLayerManager').add(this, [
            { name: 'layer0', scrollFactor: 1 },
            { name: 'layer1', scrollFactor: 0.5 },
            { name: 'layer2', scrollFactor: 0 },
        ]);

        this.layers.addToLayer('layer0', this.add.rectangle(400, 300, 100, 100, 0xff0000, 0.5));
        this.layers.addToLayer('layer1', this.add.rectangle(400, 300, 100, 100, 0x00ff00, 0.5));
        this.layers.addToLayer('layer2', this.add.rectangle(400, 300, 100, 100, 0x0000ff, 0.5));

        this.cameras.main.setScroll(50, 50);
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
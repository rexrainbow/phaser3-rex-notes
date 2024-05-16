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
        this.cameras.add(undefined, undefined, undefined, undefined, false, 'ui');

        this.layers = this.plugins.get('rexLayerManager').add(this, [
            'layer0', 'layer1'
        ]);
        this.layers.setDedicatedCamera('layer0');
        this.layers.setDedicatedCamera('layer1', 'ui');

        var gameObject1 = this.add.circle(400, 300, 20, 0xff0000);
        this.layers.addToLayer('layer1', gameObject1);

        var gameObject0 = this.add.circle(440, 300, 30, 0x00ff00);
        this.layers.addToLayer('layer0', gameObject0);


        this.cameras.getCamera('ui').setScroll(100, 100);
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
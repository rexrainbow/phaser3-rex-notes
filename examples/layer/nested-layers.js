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
        var layer0 = this.add.layer();
        var layer1 = this.add.layer();
        var rootLayer = this.add.layer();

        var gameObject0 = this.add.circle(400, 300, 20, 0xff0000);
        var gameObject1 = this.add.circle(400, 300, 30, 0x00ff00);

        rootLayer.add([layer1, layer0]);
        layer0.add(gameObject0);
        layer1.add(gameObject1);

        /*
        - gameObject1
        - layer0
            - gameObject0
        */
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
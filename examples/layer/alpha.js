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
        var layer = this.add.layer().setAlpha(0.5)
        layer.add(this.add.circle(400, 300, 50, 0xff0000))
        layer.add(this.add.circle(400, 300, 50, 0x0000ff))
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
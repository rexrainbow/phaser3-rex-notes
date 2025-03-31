import phaser from '../../../phaser/src/phaser.js';
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
        var layer0 = CreateLayer(this, 300, 300);
        var layer1 = CreateLayer(this, 500, 300);

        layer0.enableFilters()
            .filtersForceComposite = true;

        var internalCamera = layer0.filters.internal.camera;
        internalCamera.alpha = 0.5;

        layer1.alpha = 0.5;
    }

    update() { }
}

var CreateLayer = function (scene, x, y) {
    var layer = scene.add.layer()
    layer.add(scene.add.circle(x - 15, y, 50, 0xff0000))
    layer.add(scene.add.circle(x + 15, y, 50, 0x0000ff))

    return layer;
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
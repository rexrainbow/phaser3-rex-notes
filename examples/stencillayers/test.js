import Phaser from 'phaser';
import StencilLayersPlugin from '../../plugins/stencillayers-plugin.js';

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
        var image = this.add.image(400, 300, 'classroom');

        var mainLayer = this.add.rexStencilLayers()
            .addStencil('stencilA', 'layer0', { stencilInvert: true })
            .addStencil('stencilB', 'layer1', { stencilInvert: true })
            .removeStencil('stencilA', 'layer2')
            .removeStencil('stencilB', 'layer3')
            .end() // Check stencil pairs

        mainLayer.getStencil('stencilA').add(
            this.add.circle(400 - 150, 300, 200, 0x330000)
        )
        mainLayer.getStencil('stencilB').add(
            this.add.circle(400 + 150, 300, 200, 0x330000)
        )

        var print = this.add.text(300, 300, '', { fontSize: 40 });
        var layerIndex = 0;
        var PutIntoSubLayer = function () {
            var layerName = `layer${layerIndex}`;
            print.text = layerName;
            mainLayer.getLayer(layerName).add(image);
            layerIndex = (layerIndex + 1) % 4;
        }
        this.input.on('pointerdown', PutIntoSubLayer);
        PutIntoSubLayer();

    }

    update() { }
}

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x333333,
    stencil: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'StencilLayersPlugin',
            plugin: StencilLayersPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);

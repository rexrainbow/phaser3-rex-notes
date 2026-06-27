import Phaser from '../../../phaser/src/phaser.js';
import StancilMaskLayerPlugin from '../../plugins/stencilmasklayer-plugin.js';

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
        var container = this.add.rexStencilMaskContainer(400, 300)
            .addMaskGameObject(
                this.add.container(0, 0)
                    .add(
                        [
                            this.add.circle(-150, 0, 200, 0x330000),
                            this.add.circle(150, 0, 200, 0x330000)
                        ]
                    )
            )
        //.setStencilInvert(false)

        container.add(this.add.image(0, 0, 'classroom'));

        /*
        Stencil-Container
          - stencilGameObjects: container <- [circle, circle]
          - children: [image]
        */

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
            key: 'StancilMaskLayerPlugin',
            plugin: StancilMaskLayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);

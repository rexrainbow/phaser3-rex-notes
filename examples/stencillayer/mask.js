import Phaser from '../../../phaser/src/phaser.js';
import StancilLayerPlugin from '../../plugins/stencillayer-plugin.js';

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
        var layer = this.add.rexStencilLayer()
            .addStencilGameObject(
                this.add.container(400, 300)
                    .add(
                        [
                            this.add.circle(-150, 0, 200, 0x330000),
                            this.add.circle(150, 0, 200, 0x330000)
                        ]
                    )
                    .setVisible(false)
            )
        //.setStencilInvert(false)

        layer.add(this.add.image(400, 300, 'classroom'));

        /*
        Stencil-Layer
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
            key: 'StancilLayerPlugin',
            plugin: StancilLayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);

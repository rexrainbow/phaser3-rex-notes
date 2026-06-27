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
        var image = this.add.image(0, 0, 'classroom');

        var mainContainer = this.add.rexStencilContainers(400, 300)
            .addStencil({
                stencilName: 'stencilA',
                containerName: 'container0',
                stencilInvert: true
            })
            .addStencil({
                stencilName: 'stencilB',
                containerName: 'container1',
                stencilInvert: true
            })
            .removeStencil({
                stencilName: 'stencilA',
                containerName: 'container2'
            })
            .removeStencil({
                stencilName: 'stencilB',
                containerName: 'container3'
            })
            .end() // Check stencil pairs

        /*
        mainContainer
          - stencilA           (Stencil)
          - container0         (Container)
          - stencilB           (Stencil)
          - container1         (Container)
          - stencilA reference (StencilReference)
          - container2         (Container)
          - stencilB reference (StencilReference)
          - container3         (Container)
        */

        mainContainer.getStencil('stencilA').add(
            this.add.circle(- 150, 0, 200, 0x330000)
        )
        mainContainer.getStencil('stencilB').add(
            this.add.circle(150, 0, 200, 0x330000)
        )

        var print = this.add.text(300, 300, '', { fontSize: 40 });
        var containerIndex = 0;
        var PutIntoSubContainer = function () {
            var containerName = `container${containerIndex}`;
            print.text = containerName;
            mainContainer.getContainer(containerName).add(image);
            containerIndex = (containerIndex + 1) % 4;
        }
        this.input.on('pointerdown', PutIntoSubContainer);
        PutIntoSubContainer();

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

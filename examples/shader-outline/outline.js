import OutlinePipelinePlugin from '../../plugins/outlinepipeline-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var customPipeline = this.plugins.get('rexOutlinePipeline').add(this, 'Outline', {
            thickness: 3,
            outlineColor: 0xff0000
        });

        this.cameras.main.setRenderToTexture(customPipeline);

        this.add.image(400, 300, 'mushroom');
        this.add.image(300, 300, 'mushroom');
        this.add.image(400, 260, 'mushroom');

    }

    update() {
    }
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
    backgroundColor: 0x333333,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexOutlinePipeline',
            plugin: OutlinePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
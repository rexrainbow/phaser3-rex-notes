import OutlineEffectLayerPlugin from '../../plugins/outlineeffectlayer-plugin.js'

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
        var effectLayer = this.add.rexOutlineEffectLayer({
            knockout: true,
            outlineColor: 0xff0000,
            thickness: 3
        })
            .setDepth(1); // Place this effect layer in front of all target game objects

        this.gameObject = this.physics.add.image(0, 300, 'mushroom');
        effectLayer.add(this.gameObject);
        this.cameras.main.startFollow(this.gameObject);
    }

    update() {
        if (this.gameObject.x < 100) {
            this.gameObject.setVelocityX(200);
        } else if (this.gameObject.x > 700) {
            this.gameObject.setVelocityX(-200);
        }
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
    physics: {
        default: 'arcade'
    },
    plugins: {
        global: [{
            key: 'rexOutlineEffectLayer',
            plugin: OutlineEffectLayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
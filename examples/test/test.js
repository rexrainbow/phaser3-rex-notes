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
        this.game.events.on('prerender', function () {
            this.cameras.main.centerOn(this.gameObject.x, this.gameObject.y);
        }, this);

        var effectLayer = this.add.rexOutlineEffectLayer({
            knockout: true,
            outlineColor: 0xff0000,
            thickness: 3
        })
            .setDepth(1); // Place this effect layer in front of all target game objects

        this.gameObject = this.physics.add.image(0, 300, 'mushroom');
        effectLayer.add(this.gameObject);

        this.add.circle(400, 300, 10, 0x00ff00).setScrollFactor(0);
    }

    update() {
        if (this.gameObject.x < 100) {
            this.gameObject.setVelocityX(1000);
        } else if (this.gameObject.x > 700) {
            this.gameObject.setVelocityX(-1000);
        }
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    physics: {
        default: 'arcade'
    },
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexOutlineEffectLayer',
            plugin: OutlineEffectLayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
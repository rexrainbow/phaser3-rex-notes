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
        // Test camera scroll and zoom
        // this.cameras.main.centerOn(0, 0).setZoom(0.5);

        var effectLayer = this.add.rexOutlineEffectLayer({
            outlineColor: 0xff0000,
            thickness: 3
        })
            .setDepth(1); // Place this effect layer in front of all target game objects

        var circle = new Phaser.Geom.Circle(400, 300, 200);
        var pos = { x: 0, y: 0 };
        for (var i = 0; i < 10; i++) {
            circle.getRandomPoint(pos);
            this.add.image(
                pos.x,
                pos.y,
                'mushroom'
            )
                .setInteractive()
                .on('pointerover', function () {
                    effectLayer.add(this)
                })
                .on('pointerout', function () {
                    effectLayer.remove(this)
                })
        }
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
            key: 'rexOutlineEffectLayer',
            plugin: OutlineEffectLayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
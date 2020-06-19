import OutlineEffectLayer from '../../plugins/gameobjects/effectlayer/outline/OutlineEffectLayer.js';

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
        var effectLayer = new OutlineEffectLayer(this);
        this.add.existing(effectLayer);

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
    scene: Demo
};

var game = new Phaser.Game(config);
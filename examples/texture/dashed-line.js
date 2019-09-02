import CreateDashedTexture from '../../plugins/utils/texture/CreateDashedTexture.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateDashedTexture(this, 'dashed', 10, 0.25, 0xff0000);
        var dashedLine = this.add.tileSprite(400, 300, 10, 3, 'dashed').setOrigin(0, 0.5);
        this.input.on('pointermove', function (pointer) {
            dashedLine.width = Phaser.Math.Distance.Between(dashedLine.x, dashedLine.y, pointer.x, pointer.y);
            dashedLine.rotation = Phaser.Math.Angle.Between(dashedLine.x, dashedLine.y, pointer.x, pointer.y);
        })
    }

    update() { }
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
};

var game = new Phaser.Game(config);
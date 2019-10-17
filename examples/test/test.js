class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var textureKey = 'img';
        CreateTexture(this, textureKey);
        this.add.image(0, 0, textureKey).setOrigin(0);

        var frameName = '1,1';
        this.textures.get(textureKey).add(
            frameName, 0,
            10, 10,
            10, 10
        );
        this.add.image(0, 30, textureKey, frameName).setOrigin(0);

        this.add.renderTexture(400, 300, 100, 100)
            .setOrigin(0.5)
            .clear
            .drawFrame(textureKey, frameName, 100 - 10, 100 - 10)
    }

    update(time, delta) {
    }
}

const COLOR_PRIMARY = 0x9575cd;
const COLOR_LIGHT = 0xc7a4ff;
const COLOR_DARK = 0x65499c;
var CreateTexture = function (scene, key) {
    var width = 20, height = 20;
    scene.add.graphics()
        .lineStyle(3, COLOR_DARK)
        .strokeRect(1, 1, width - 2, height - 2)
        .generateTexture(key, width, height)
        .destroy();
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
    scene: Demo
};

var game = new Phaser.Game(config);
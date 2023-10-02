import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('icons', 'assets/images/icons.png', 'assets/images/icons.json');
    }

    create() {
        this.add.image(400, 300, 'icons', '__BASE');

        var frameNames = this.sys.textures.get('icons').getFrameNames();

        var canvasTexture = this.textures.createCanvas('canvas', 144, 36);
        var dynamicTexture = this.textures.addDynamicTexture('dynamic', 144, 36);
        for (var i = 0, cnt = frameNames.length; i < cnt; i++) {
            var x = 36 * i,
                y = 0;
            canvasTexture.drawFrame('icons', frameNames[i], x, y);
            dynamicTexture.drawFrame('icons', frameNames[i], x, y);
        }

        this.add.image(0, 0, 'canvas').setOrigin(0);

        this.add.image(0, 64, 'dynamic').setOrigin(0);

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
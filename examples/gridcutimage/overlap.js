import phaser from 'phaser/src/phaser.js';
import GridCutImagePlugin from '../../plugins/gridcutimage-plugin';
import DrawBounds from '../../plugins/utils/bounds/DrawBounds.js';

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
        var overlap = 30;

        CreatePaddingTexture(this, 'classroom', overlap); // 'classroom-pad'

        var image = this.add.image(400, 300, 'classroom-pad')
            .setScale(0.5).setAngle(-30).setVisible(false)

        var cellImages = this.plugins.get('rexGridCutImage').gridCut(image, 4, 3, {
            overlap: overlap
        })

        for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
            let cellImage = cellImages[i];
            cellImage
                .setAlpha(0.3)
                .setInteractive()
                .on('pointerover', function () {
                    cellImage.setAlpha(1)
                })
                .on('pointerout', function () {
                    cellImage.setAlpha(0.3);
                })
        }

        DrawBounds(cellImages, this.add.graphics(), 0xff0000)

    }

    update() { }
}

var CreatePaddingTexture = function (scene, key, overlap) {
    var frame = scene.textures.getFrame(key);
    var newTextureWidth = frame.cutWidth + overlap * 2;
    var newTextureHeight = frame.cutHeight + overlap * 2;
    var texture = scene.textures.createCanvas(`${key}-pad`, newTextureWidth, newTextureHeight);
    texture.drawFrame(key, undefined, overlap, overlap);
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
    plugins: {
        global: [{
            key: 'rexGridCutImage',
            plugin: GridCutImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
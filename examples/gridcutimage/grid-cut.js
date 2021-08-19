import 'phaser';
import GridCutImagePlugin from '../../plugins/gridcutimage-plugin';

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
        var image = this.add.image(400, 300, 'classroom')
            .setScale(0.5).setAngle(-30).setVisible(false)

        var cellImages = this.plugins.get('rexGridCutImage').gridCut(image, 10, 10)
        for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
            let cellImage = cellImages[i];
            cellImage
                .setAlpha(0.3)
                .setInteractive()
                .on('pointerover', function () {
                    cellImage.setAlpha(0.5)
                })
                .on('pointerout', function () {
                    cellImage.setAlpha(1);
                })
        }

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
    plugins: {
        global: [{
            key: 'rexGridCutImage',
            plugin: GridCutImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
import phaser from 'phaser/src/phaser.js';
import { mask } from '../../../phaser/src/gameobjects/components/Mask';

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
        var bg = this.add.image(400, 300, 'classroom');
        var obj0 = this.add.circle(300, 300, 30).setFillStyle(0xffffff, 0.5);
        var obj1 = this.add.circle(500, 300, 30).setFillStyle(0xffffff, 0.5).setBlendMode('ADD');
        var layer = this.add.layer();
        layer.add([bg, obj0, obj1])

        var maskSource = this.add.graphics();
        maskSource.fillStyle(0xffffff, 0.5).fillRect(200, 200, 400, 200).setVisible(false);
        var mask = maskSource.createGeometryMask();
        layer.setMask(mask);

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
    scene: Demo
};

var game = new Phaser.Game(config);
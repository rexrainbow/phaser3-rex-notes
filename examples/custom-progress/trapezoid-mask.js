import 'phaser';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';

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
        var image0 = this.add.image(400, 300, 'classroom').setScale(0.75);

        var maskGameObject = CreateMask(this)
            .setSize(800, 600).setScale(0.75)
            .setPosition(400, 300)

        image0.setMask(
            maskGameObject.createGeometryMask().setInvertAlpha()
        );


        maskGameObject
            .setEaseValueFunction('Cubic')
            .setEaseValueDuration(4000)
            .easeValueTo(1)

    }

    update() { }
}

var CreateMask = function (scene) {
    return scene.add.rexCustomProgress({
        type: 'Graphics',
        create: [
            { name: 'trapezoid0', type: 'lines' },
            { name: 'trapezoid1', type: 'lines' },
        ],
        update: function () {
            var height = this.height * this.value;
            var width0 = this.width * 0.4;
            var width1 = this.width * (0.4 + 0.2 * this.value);

            this.getShape('trapezoid0')
                .fillStyle(0xffffff)
                .startAt(0, this.height)
                .lineTo(width0, this.height)
                .lineTo(width1, this.height - height)
                .lineTo(0, this.height - height)
                .close()

            this.getShape('trapezoid1')
                .fillStyle(0xffffff)
                .startAt(this.width, 0)
                .lineTo(this.width - width0, 0)
                .lineTo(this.width - width1, height)
                .lineTo(this.width, height)
                .close()
        },
    })
        .setVisible(false)
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
            key: 'CustomProgressPlugin',
            plugin: CustomProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
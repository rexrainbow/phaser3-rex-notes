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
            { name: 'pie', type: 'arc' },
        ],
        update: function () {            
            var radius = Math.max(this.width, this.height) * 2;
            var deltaAngle = 90 * this.value;

            this.getShape('pie')
                .fillStyle(0xffffff)
                .setCenterPosition(this.centerX, 0)
                .setRadius(radius)
                .setAngle(90 - deltaAngle, 90 + deltaAngle)
                .setPie();

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
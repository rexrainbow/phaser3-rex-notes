import 'phaser';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';
import PerlinPlugin from '../../plugins/perlin-plugin.js';

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
            .setEaseValueDuration(4000)
            .easeValueTo(1)

    }

    update() { }
}

var CreateMask = function (scene) {
    var maskGameObject = scene.add.rexCustomProgress({
        type: 'Graphics',
        create: [
            { name: 'wave', type: 'lines' },
        ],
        update: function () {
            var startY = this.height * (1 - this.value);
            var amplitude = this.height * 0.03;
            var noiseX = 0.01, noiseY = 0.01;

            var polygon = this.getShape('wave')
                .fillStyle(0xffffff)

            polygon
                .startAt(0, this.height)
                .lineTo(0, startY);

            if (this.value === 0) {
                this.noise.setSeed(Math.random());
            }

            if (this.value < 1) {
                var segment = this.width / 12;
                for (var i = 1; i < 12; i++) {
                    var x = segment * i;
                    var y = startY + this.noise.simplex2(x * noiseX, startY * noiseY) * amplitude;
                    if (i === 1) {
                        var cx = segment * 0.01;
                        var cy = startY + this.noise.simplex2(cx * noiseX, startY * noiseY) * amplitude;
                        polygon.quadraticBezierTo(cx, cy, x, y);
                    } else {
                        polygon.smoothQuadraticBezierTo(x, y);
                    }

                }
            }

            polygon
                .lineTo(this.width, startY)
                .lineTo(this.width, this.height)
                .close()
        },
    })
        .setVisible(false)

    maskGameObject.noise = scene.plugins.get('rexPerlin').add(Math.random())

    return maskGameObject;
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
        global: [
            {
                key: 'CustomProgressPlugin',
                plugin: CustomProgressPlugin,
                start: true
            },
            {
                key: 'rexPerlin',
                plugin: PerlinPlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);
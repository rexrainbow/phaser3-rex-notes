import phaser from 'phaser/src/phaser.js';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var path = CreatePath(this)
            .setSize(200, 200)
            .setFillStyle(0x6ab7ff, 1)
            .setStrokeStyle(5, 0x005cb2, 1)
            .setPosition(250, 300)

        var tween = this.tweens.add({
            targets: path,
            value: 1,
            repeat: -1
        })
        this.input
            .on('pointerdown', function () {
                tween.setTimeScale(0.1);
            })
            .on('pointerup', function () {
                tween.setTimeScale(1);
            })


    }

    update() { }
}

var CreatePath = function (scene) {
    return scene.add.rexCustomProgress({
        create: [
            { name: 'pathRef', type: 'lines' },
            { name: 'path', type: 'lines' },
            { name: 'dot', type: 'circle' },
        ],
        update: function () {
            var centerX = this.centerX,
                centerY = this.centerY,
                radius = this.radius;


            if (this.isSizeChanged) {
                this.getShape('pathRef')

                    .startAt(centerX, centerY)
                    .lineTo(centerX, centerY + radius)
                    .arc(centerX, centerY, radius, 90, 180)
                    .lineTo(centerX, centerY)

                    .lineTo(centerX + radius, centerY)
                    .arc(centerX, centerY, radius, 360, 270, true)
                    .lineTo(centerX, centerY)

                    .lineTo(centerX, centerY + radius)
                    .arc(centerX, centerY, radius, 90, 360, true)
                    .lineTo(centerX, centerY)

                    .lineTo(centerX - radius, centerY)
                    .arc(centerX, centerY, radius, 180, 270)
                    .lineTo(centerX, centerY)

                    .end()

                this.getShape('dot')
                    .fillStyle(this.fillColor, this.fillAlpha)
                    .setRadius(radius * 0.1)
            }

            var startT = this.value;
            var endT = startT + 0.2;

            var path = this.getShape('path');
            path
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .copyPathFrom(this.getShape('pathRef'), startT, endT)
                .end()

            this.getShape('dot')
                .setCenterPosition(path.lastPointX, path.lastPointY)

        },
    })
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
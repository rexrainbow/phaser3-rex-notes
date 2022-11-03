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
            .setFillStyle(0xff0000, 1)
            .setStrokeStyle(2, 0xffffff, 1)
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
            { name: 'path', type: 'lines' },
        ],
        update: function () {
            var centerX = this.centerX,
                centerY = this.centerY,
                radius = this.radius;

            var path = this.getShape('path')

            if (this.isSizeChanged) {
                path
                    .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)

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

                    .close()
            }

            var startT = this.value + 0.5;
            var endT = startT + 0.2;
            path.setDisplayPathSegment(startT, endT);

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
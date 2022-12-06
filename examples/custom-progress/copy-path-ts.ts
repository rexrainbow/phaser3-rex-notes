import 'phaser';
import CustomProgress from '../../plugins/customprogress';

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

var CreatePath = function (scene: Phaser.Scene) {
    let gameObject = new CustomProgress(scene, {
        create: [
            { name: 'pathRef', type: 'lines' },
            { name: 'path', type: 'lines' },
            { name: 'dot', type: 'circle' },
        ],

        update: function () {
            let centerX = this.centerX,
                centerY = this.centerY,
                radius = this.radius;

            let lines = this.getShape('pathRef') as CustomProgress.Lines;
            let circle = this.getShape('dot') as CustomProgress.Circle;

            if (this.isSizeChanged) {
                lines
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

                circle
                    .fillStyle(this.fillColor, this.fillAlpha)
                    .setRadius(radius * 0.1)
            }

            let startT = this.value;
            let endT = startT + 0.2;

            let path = this.getShape('path') as CustomProgress.Lines;
            path
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .copyPathFrom(lines, startT, endT)
                .end()

            circle
                .setCenterPosition(path.lastPointX, path.lastPointY)

        },
    })
    scene.add.existing(gameObject);

    return gameObject;
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
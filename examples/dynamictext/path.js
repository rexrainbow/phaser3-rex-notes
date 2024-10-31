import phaser from 'phaser/src/phaser.js';
import DynamicTextPlugin from '../../plugins/dynamictext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var path = this.add.path()
            .add(
                new Phaser.Curves.Ellipse(
                    400, 300, // x, y
                    380, 280, // xRadius, yRadius
                    200, 340 // startAngle, endAngle
                )
            )
        path.draw(this.add.graphics({ lineStyle: { color: 0xff0000 } }));

        var content = 'Phaser is a fast, free, and fun open source HTML5 game framework';
        var faceToPos = { x: 400, y: 300 };
        var rad90 = Phaser.Math.DegToRad(90);
        var text = this.add.rexDynamicText(
            {
                x: 400, y: 300,
                width: 800, height: 600,
                style: {
                    fontSize: '16px',
                },
            }
        )
            .appendText(content)
            .forEachChild(function (child, childIndex) {
                var pos = path.getPoint(childIndex / (content.length - 1))
                child
                    .setPosition(pos.x, pos.y)
                    .setRotation(Phaser.Math.Angle.BetweenPoints(pos, faceToPos) - rad90)
            })
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
            key: 'rexDynamicText',
            plugin: DynamicTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
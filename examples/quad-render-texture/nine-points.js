import 'phaser';
import QuadImagePlugin from '../../plugins/quadimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var mushroom = this.make.image({ key: 'mushroom', add: false });
        var numberText = this.make.text({
            text: '7',
            style: { color: 'red', fontSize: '36px', fontFamily: 'serif' },
            add: false
        }).setOrigin(1);

        var image = this.add.rexQuadRenderTexture(400, 300, 150, 200, { hideCCW: false, ninePointMode: true });
        image.rt
            .fill(0x888888)
            .draw(numberText, 150, 200)
            .draw(mushroom, 75, 100)

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        var controlPoints = image.controlPoints;
        for (var i = 0, cnt = controlPoints.length; i < cnt; i++) {
            CreateControlCircle(this, controlPoints[i]);
        }

        this.add.image(600, 300, image.texture.key);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
}

var CreateControlCircle = function (scene, controlPoint) {
    var circle = scene.add.circle(controlPoint.x, controlPoint.y, 10, 0xff0000)
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            circle.x = dragX;
            circle.y = dragY;
            controlPoint.setPosition(dragX, dragY);
        });
    return circle;
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
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexQuadImage',
            plugin: QuadImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
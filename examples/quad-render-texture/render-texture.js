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

        var image = this.add.rexQuadRenderTexture(400, 300, 150, 200);
        image.rt
            .fill(0x888888)
            .draw(numberText, 150, 200)
            .draw(mushroom, 75, 100)

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        CreateControlPoint(this, image.topLeft);
        CreateControlPoint(this, image.topRight);
        CreateControlPoint(this, image.bottomLeft);
        CreateControlPoint(this, image.bottomRight);

        this.add.image(600, 300, image.texture.key);
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
}

var CreateControlPoint = function (scene, quadVertex) {
    var controlPoint = scene.add.circle(quadVertex.x, quadVertex.y, 10, 0xff0000)
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            controlPoint.x = dragX;
            controlPoint.y = dragY;
            quadVertex.setPosition(dragX, dragY);
        });
    return controlPoint;
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
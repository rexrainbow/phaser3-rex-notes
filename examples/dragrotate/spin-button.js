import DragRotatePlugin from '../../plugins/dragrotate-plugin.js';

const ColorGray = 0x8e8e8e;
const ColorBlue = 0x5eb8ff;
const ColorRed = 0xfa5788;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var x = 400,
            y = 300;
        createButton(this, x, y, 100);
        createButton(this, x, y, 150);
        createButton(this, x, y, 200);
    }

    update() {}
}

var createButton = function (scene, x, y, radius) {
    var config = {
        x: x,
        y: y,
        maxRadius: radius,
        minRadius: radius - 50
    };

    var lineWidth = 3;
    var x = config.maxRadius + lineWidth,
        y = x,
        width = x * 2,
        height = width;

    var buttonGraphics = scene.add.graphics()
        .lineStyle(lineWidth, 0xffffff, 1)
        .strokeCircle(x, y, config.minRadius + lineWidth)
        .strokeCircle(x, y, config.maxRadius)
        .lineBetween(x + config.minRadius, y, x + config.maxRadius, y);

    var button = scene.add.renderTexture(config.x, config.y, width, height)
        .draw(buttonGraphics)
        .setOrigin(0.5)
        .setTint(ColorGray);
    buttonGraphics.destroy();

    scene.plugins.get('rexDragRotate').add(scene, config)
        .on('drag', function (dragRotate) {
            button.rotation += dragRotate.deltaRotation;
            var color = (dragRotate.cw) ? ColorBlue : ColorRed;
            button.setTint(color);
        })
        .on('dragend', function () {
            button.setTint(ColorGray);
        })

    return button;
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
            key: 'rexDragRotate',
            plugin: DragRotatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
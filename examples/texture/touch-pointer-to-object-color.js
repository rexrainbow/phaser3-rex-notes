import LocalXYToColor from '../../plugins/utils/texture/LocalXYToColor.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var key = 'colorWheel';
        createTexture(this, key);

        var pickedColor = this.add.circle(100, 100, 30).setStrokeStyle(2, 0xffffff);
        var img = this.add.image(400, 300, key);
        img
            .setInteractive()
            .on('pointerdown', function (pointer, localX, localY, event) {
                var color = LocalXYToColor(img, localX, localY);
                pickedColor.setFillStyle(color.color);
            })
    }

    update() { }
}

const DegToRad = Phaser.Math.DegToRad;
var createTexture = function (scene, key) {
    var colors = Phaser.Display.Color.HSVColorWheel(1, 1);
    var graphics = scene.add.graphics();
    var r = 150;
    colors.forEach(function (item, i) {
        var a = DegToRad(i);
        graphics
            .lineStyle(2, item.color)
            .lineBetween(
                r,
                r,
                r + (r * Math.cos(a)),
                r + (r * Math.sin(a))
            )
    })

    graphics
        .generateTexture(key, r * 2, r * 2)
        .destroy();
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
    scene: Demo
};

var game = new Phaser.Game(config);
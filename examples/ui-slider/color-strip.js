import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var colorPicker = CreateColorPicker(this, 400, 60)
            .setPosition(400, 300)
            .layout()
            .drawBounds(this.add.graphics(), 0xffffff)
    }

    update() { }
}

var CreateColorPicker = function (scene, width, height) {
    var colorStrip = CreateColorStrip(scene, width, height);
    var thumb = scene.add.rectangle(0, 0, 20, 30);

    var slider = scene.rexUI.add.slider({
        height: 30,
        thumb: thumb,
        input: 'click',
        valuechangeCallback: function (value) {
            var x = (colorStrip.width - 1) * value;
            var color = colorStrip.getPixel(x, 0);
            thumb.setFillStyle(color.color);
        }
    })

    colorStrip
        .setInteractive()
        .on('pointerdown', function (pointer, localX, localY) {
            slider.setValue(localX / colorStrip.width)
        })

    var colorPicker = scene.rexUI.add.sizer({
        orientation: 'y',
    })
        .add(colorStrip)
        .add(slider, { expand: true })
    return colorPicker;
}

var CreateColorStrip = function (scene, width, height) {
    var canvas = scene.rexUI.add.canvas(0, 0, width, height);
    var ctx = canvas.context;
    var grd = ctx.createLinearGradient(0, 0, width, 0);
    grd.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd.addColorStop(1, 'rgba(255, 0, 0, 1)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    canvas.updateTexture();
    return canvas;
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);
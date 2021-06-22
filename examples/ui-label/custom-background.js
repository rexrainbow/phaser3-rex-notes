import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 500, height: 50,
            orientation: 0
        })
            .add(
                createLabel(this, 'button0'),  // child
                1,                             // proportion
                'center'                       // align
            )
            .add(
                createLabel(this, 'button1'),  // child
                1,                             // proportion
                'center'                       // align
            )
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
    }

    update() { }
}

// Overwrite resize method
var createBackground = function (scene) {
    var canvas = scene.rexUI.add.canvas();
    var oldResizeMethod = canvas.resize;
    canvas.resize = function (width, height) {
        oldResizeMethod.call(canvas, width, height);
        var ctx = canvas.getCanvas().getContext("2d");
        // Create gradient
        var grd = ctx.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, "black");
        grd.addColorStop(1, "white");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
    }

    return canvas;
}

// ES6 class
// var createBackground = function(scene) {
//     var canvas = new MyCanvasBackground(scene);
//     scene.add.existing(canvas);
//     return canvas;
// }
// 
// class MyCanvasBackground extends RexPlugins.UI.Canvas {
//     resize(width, height) {
//         super.resize(width, height);
//         var ctx = this.getCanvas().getContext("2d");
//         // Create gradient
//         var grd = ctx.createLinearGradient(0, 0, width, 0);
//         grd.addColorStop(0, "black");
//         grd.addColorStop(1, "white");
// 
//         // Fill with gradient
//         ctx.fillStyle = grd;
//         ctx.fillRect(0, 0, width, height);
//     }
// }

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: createBackground(scene),
        text: scene.add.text(0, 0, text),
        align: 'center',
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10
        }
    });
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
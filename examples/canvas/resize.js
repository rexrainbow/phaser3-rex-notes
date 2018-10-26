import CanvasPlugin from 'rexPlugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var canvas = this.add.rexCanvas(300, 300, 200, 200)
            .resize(300, 300)
            .fill('dimgray');
    }

    update() {}
}

var drawCircle = function (pointer, localX, localY) {
    var src = this.getCanvas();
    var ctx = src.getContext('2d');
    ctx.beginPath();
    ctx.arc(localX, localY, 10, 0, Phaser.Math.PI2, false);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();

    this.generateTexture('canvas');
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCanvas',
            plugin: CanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
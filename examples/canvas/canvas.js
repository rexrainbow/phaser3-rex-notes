import CanvasPlugin from '../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var canvas = this.add.rexCanvas(300, 300, 10, 10)
            .resize(200, 200)
            .fill('dimgray')
            .setInteractive()
            .on('pointerdown', drawCircle);
        canvas.rotation = Phaser.Math.DegToRad(45);

        // create or update texture from canvas
        canvas.generateTexture('canvas');
        // create Image object using that texture
        this.add.image(100, 100, 'canvas');
    }

    update() { }
}

var drawCircle = function (pointer, localX, localY) {
    var ctx = this.context;
    ctx.beginPath();
    ctx.arc(localX, localY, 10, 0, Phaser.Math.PI2, false);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();

    this.needRedraw();
    this.generateTexture('canvas');
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
            key: 'rexCanvas',
            plugin: CanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
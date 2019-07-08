import CanvasPlugin from '../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('characters', 'assets/images/characters/characters.png', 'assets/images/characters/characters.json');
    }

    create() {
        var canvas = this.add.rexCanvas(400, 300)
            .loadTexture('characters', 'A-smile')

        this.input.once('pointerdown', function () {
            canvas.loadTexture('characters', 'B-smile')
        })
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
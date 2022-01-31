import 'phaser';
import LinePlugin from '../../plugins/line-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'https://images.unsplash.com/photo-1640622307877-1e40352b9a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')
    }

    create() {
        CreateDashedTexture(this, 'dashed', 10, 0.4, 0x8888ff);
        CreateCircleTexture(this, 'circle', 20, 0x8888ff);
        CreateTriangleTexture(this, 'triangle', 20, 20, 0x8888ff, 0);

        this.add.image(0, 0, 'bg')

        var line = this.add.rexLine({
            start: {
                x: 400, y: 300,
                key: 'circle', origin: 0.5,
            },
            end: {
                x: 600, y: 300,
                key: 'triangle', origin: 1,
            },
        
            body: {
                key: 'dashed', extendMode: 'repeat',
                width: 5,
            }
        });

        this.input.on('pointermove', function (pointer) {
            line.setLineEndPosition(pointer.x, pointer.y);
        })

        this.add.text(0, 580, 'Move touch pointer')
    }

    update() {

    }
}

var CreateDashedTexture = function (scene, key, width, k, color, height) {
    if (width === undefined) {
        width = 10;
    }
    if (k === undefined) {
        k = 0.5;
    }
    if (color === undefined) {
        color = 0xffffff;
    }
    if (height === undefined) {
        height = 2;
    }

    scene.add.graphics()
        .fillStyle(color)
        .fillRect(0, 0, (width * k), height)
        .generateTexture(key, width, height)
        .destroy();
}
var CreateCircleTexture = function (scene, key, width, color) {
    if (color === undefined) {
        color = 0xffffff;
    }
    var r = width / 2;
    scene.add.graphics()
        .fillStyle(color)
        .fillCircle(r, r, r)
        .generateTexture(key, width, width)
        .destroy();
}
var CreateTriangleTexture = function (scene, key, width, height, color, direction) {
    if (height === undefined) {
        height = width;
    }
    if (color === undefined) {
        color = 0xffffff;
    }
    if (direction === undefined) {
        direction = 0;
    }
    if (typeof (direction) === 'string') {
        direction = DIRMODE[direction];
    }

    var x1, y1, x2, y2, x3, y3;
    switch (direction) {
        case 1: // down
            x1 = 0;
            y1 = 0;
            x2 = width;
            y2 = 0;
            x3 = width / 2;
            y3 = height;
            break;
        case 2: // right
            x1 = 0;
            y1 = height / 2;
            x2 = width;
            y2 = 0;
            x3 = width;
            y3 = height;
            break;
        case 3: // up
            x1 = 0;
            y1 = height;
            x2 = width / 2;
            y2 = 0;
            x3 = width;
            y3 = height;
            break;
        default: // 0, right
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = height;
            x3 = width;
            y3 = height / 2;
            break;
    }

    scene.add.graphics()
        .fillStyle(color)
        .fillTriangle(x1, y1, x2, y2, x3, y3)
        .generateTexture(key, width, height)
        .destroy();
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexLine',
            plugin: LinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
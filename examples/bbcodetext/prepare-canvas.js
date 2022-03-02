import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

var CreateBBCodeText = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.rexBBCodeText(400, 300, '123');
    }
    var t1 = performance.now();
    scene.add.text(400, 250, `BBCodeText: ${Math.floor(t1 - t0)}`);
    /*
    1000: 1439 (normal) vs 1424 (prepare-canvas)
    */
}

var PrepareCanvas = function (scene, count) {
    var CanvasPool = Phaser.Display.Canvas.CanvasPool;
    var canvas = [];
    for (var i = 0; i < count; i++) {
        canvas.push(CanvasPool.create(scene))
    }

    debugger
    for (var i = 0; i < count; i++) {
        CanvasPool.remove(canvas[i]);
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var count = 1000;
        PrepareCanvas(this, count);
        this.time.delayedCall(2000, CreateBBCodeText, [this, count]);
    }

    update() { }
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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
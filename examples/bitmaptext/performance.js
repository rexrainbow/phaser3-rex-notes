import phaser from 'phaser/src/phaser.js';

var CreateBitmapText = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.bitmapText(200, 300, 'gothic', '123\n123\n123');
    }
    var t1 = performance.now();
    scene.add.text(200, 250, `BitmapText: ${Math.floor(t1 - t0)}`);
    /*
     10: 1
     100: 2
     1000: 10
     */
}

var CreateDynamicBitmapText = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.dynamicBitmapText(500, 300, 'gothic', '123\n123\n123');
    }
    var t1 = performance.now();
    scene.add.text(500, 250, `DynamicBitmapText: ${Math.floor(t1 - t0)}`);
    /*
    10: 0
    100: 1
    1000: 9
    */
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var count = 1000;
        this.time.delayedCall(1000, CreateBitmapText, [this, count]);
        this.time.delayedCall(2000, CreateDynamicBitmapText, [this, count]);
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
};

var game = new Phaser.Game(config);
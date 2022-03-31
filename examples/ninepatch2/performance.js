import phaser from 'phaser/src/phaser.js';
import NinePatchPlugin from '../../plugins/ninepatch-plugin.js';
import NinePatch2Plugin from '../../plugins/ninepatch2-plugin.js';

var CreateNinePatch = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.rexNinePatch({
            x: 200, y: 450,
            width: 250, height: 200,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })
    }
    var t1 = performance.now();
    scene.add.text(200, 250, `NinePatch: ${Math.floor(t1 - t0)}`);
    /*
     10: 24
     100: 119
     1000: 2352
     */
}

var CreateNinePatch2 = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.rexNinePatch2({
            x: 500, y: 450,
            width: 250, height: 200,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })

    }
    var t1 = performance.now();
    scene.add.text(500, 250, `NinePatch2: ${Math.floor(t1 - t0)}`);
    /*
    10: 5
    100: 36
    1000: 360
    */
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg2', 'assets/images/ninepatch/nine-patch.png');
    }

    create() {
        var count = 1000;
        this.time.delayedCall(1000, CreateNinePatch, [this, count]);
        this.time.delayedCall(2000, CreateNinePatch2, [this, count]);
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
        global: [
            {
                key: 'rexNinePatch',
                plugin: NinePatchPlugin,
                start: true
            },
            {
                key: 'rexNinePatch2',
                plugin: NinePatch2Plugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);
import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

var CreateText = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.text(200, 300, '123');
    }
    var t1 = performance.now();
    scene.add.text(200, 250, `Text: ${Math.floor(t1 - t0)}`);
    /*
     10: 28
     100: 95
     1000: 817
     */
}

var CreateBBCodeText = function (scene, count) {
    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        scene.add.rexBBCodeText(500, 300, '123');
    }
    var t1 = performance.now();
    scene.add.text(500, 250, `BBCodeText: ${Math.floor(t1 - t0)}`);
    /*
    10: 28
    100: 114
    1000: 1439
    */
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
        this.time.delayedCall(1000, CreateText, [this, count]);
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
import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.input.once('pointerdown', function () {
            var t0 = window.performance.now();
            for (var i = 0; i < 1000; i++) {
                this.add.rexBBCodeText(400, 300, i);
            }
            var t1 = window.performance.now();
            console.log(t1 - t0);
        }, this)
        
        /*        
        10: 17.5
        100: 125
        1000: 1209.5999999642372
        */
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
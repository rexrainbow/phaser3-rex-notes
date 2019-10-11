import ScalePlugin from '../../plugins/scale-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var obj;
        this.input.on('pointerdown', function (pointer) {
            if (obj) {
                this.plugins.get('rexScale').scaleDownDestroy(obj, 500)
                    .once('complete', function () { console.log('scaleDownDestroy') })
                obj = undefined;
            } else {
                obj = this.add.rectangle(pointer.x, pointer.y, 200, 200, 0x00bcd4);
                this.plugins.get('rexScale').popup(obj, 1000)
                    .once('complete', function () { console.log('popup') })
            }
        }, this);
    }

    update() { }
}

var config = {
    type: Phaser.CANVAS,
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
            key: 'rexScale',
            plugin: ScalePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
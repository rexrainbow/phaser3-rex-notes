import ScalePlugin from 'rexPlugins/scale-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var obj = this.add.rectangle(400, 300, 200, 200, 0x00bcd4);
        this.plugins.get('rexScale').scaleDownDestroy(obj, 2000);
    }

    update() {}
}

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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
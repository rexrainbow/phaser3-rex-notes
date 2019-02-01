import LifeTimePlugin from '../../plugins/lifetime-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var obj = this.add.rectangle(400, 300, 80, 80, 0x00cccc);
        obj.lifeTime = this.plugins.get('rexLifeTime').add(obj, {
                lifeTime: 1000
                // destroy: true
            })
            .on('die', function () {
                console.log('die');
            })
    }

    update() {}
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
            key: 'rexLifeTime',
            plugin: LifeTimePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
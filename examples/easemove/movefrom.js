import EaseMovePlugin from '../../plugins/easemove-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var dot = this.add.circle(400, 300, 20, 0xffffff);
        var easeMove = this.plugins.get('rexEaseMove').moveFrom(dot, '-=300', undefined, 1000, 'Bounce');
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
            key: 'rexEaseMove',
            plugin: EaseMovePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
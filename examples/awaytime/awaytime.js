import AwayTimePlugin from '../../plugins/awaytime-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var awaytime = this.plugins.get('rexAwayTime').awayTime;
        this.add.text(0, 0, awaytime);
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
            key: 'rexAwayTime',
            plugin: AwayTimePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
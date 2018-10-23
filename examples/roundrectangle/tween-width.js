import RoundrRctanglePlugin from 'rexPlugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var shape = this.add.rexRoundRectangle(400, 300, 240, 100, 50, 0x008888).setScale(0, 1);

        var tween = this.tweens.add({
            targets: shape,
            scaleX: 1, // '+=100'
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0, // -1: infinity
            yoyo: false
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexRoundrRctangle',
            plugin: RoundrRctanglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
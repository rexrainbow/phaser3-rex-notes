import FadePlugin from '../../plugins/fade-plugin.js';

const Between = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        for (var i = 0; i < 500; i++) {
            var dot = this.add.circle(Between(5, 795), Between(5, 595), 3, 0xffffff).setAlpha(0);
            var fade = this.plugins.get('rexFade').add(dot, {
                delay: Between(0, 100),
                duration: Between(500, 1000),
                start: Math.random(),
                end: Math.random(),
                mode: 'yoyo'
            });
            fade.start();
        }
    }
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
            key: 'rexFade',
            plugin: FadePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
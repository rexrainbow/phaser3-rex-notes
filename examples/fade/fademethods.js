import phaser from 'phaser/src/phaser.js';
import FadePlugin from '../../plugins/fade-plugin.js';

const Between = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    async create() {
        this.plugins.get('rexFade').inject(Phaser.GameObjects.GameObject.prototype)
        var dot = this.add.circle(400, 300, 20, 0xff0000);

        await dot.fadeInPromise(2000)
        await dot.fadeOutDestroyPromise(2000)

        console.log('complete');

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
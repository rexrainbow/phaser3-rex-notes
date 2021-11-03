import 'phaser';
import LSDataPlugin from '../../plugins/localstorage-data-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.plugins.get('rexLSData').extend(this.registry, {
            init: { a: 10, b: 20 }
        })

        this.registry.inc('a', 3)

        console.log(this.registry.get('a'));
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
            key: 'rexLSData',
            plugin: LSDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
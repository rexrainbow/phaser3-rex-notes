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
            name: 'config',
            default: { a: 10, b: 20 }
        })

        var print = this.add.text(0, 0, '');
        print.text = `a=${this.registry.get('a')}`;

        this.registry.events
            .on('changedata-a', function (parent, value, previousValue) {
                print.text = `a=${value}`;
            })

        this.input.on('pointerup', function () {
            this.registry.inc('a', 3)
        }, this);
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
import phaser from 'phaser/src/phaser.js';
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
        var data = this.plugins.get('rexLSData').add(this, {
            default: { a: 10, b: 20 }
        })

        var print = this.add.text(0, 0, '');
        print.text = `\
a=${data.get('a')}
c=${data.get('c')}
`;
        // data.get('c') = undefined at first run
        // data.get('c') = 30        after first run

        data.set('c', 30);

        data.events
            .on('changedata-a', function (parent, value, previousValue) {
                print.text = `a=${value}`;
            })

        this.input.on('pointerup', function () {
            data.inc('a', 3)
        });
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
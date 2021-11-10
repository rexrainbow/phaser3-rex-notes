import 'phaser';
import AddDataMonitor from '../../plugins/utils/proxy/DataMonitor';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var EE = new Phaser.Events.EventEmitter();
        EE
            .on('set-c.*', function (prop: string, value: unknown) {
                console.log(prop, value);
            })
            .on('set-c.a', function (value: unknown) {
                console.log('a', value);
            })

        var data = { a: 10, b: 20, c: { a: 10, b: 20 } };
        data = AddDataMonitor(data, EE);
        data.c.a += 30;
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
    scene: Demo
};

var game = new Phaser.Game(config);
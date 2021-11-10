import 'phaser';
import AddDataMonitor from '../../plugins/utils/proxy/datamonitor/DataMonitor.js';

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
            .on('set-c.*', function (prop, value) {
                console.log(prop, value);
            })
            .on('set-c.a', function (value) {
                console.log('a', value);
            })

        var data = { a: 10, b: 20, c: { a: 10, b: 20 } };
        data = AddDataMonitor(data, EE);
        data.c.a += 30;
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);
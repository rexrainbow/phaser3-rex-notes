import 'phaser';
import AddDataMonitor from '../../plugins/utils/proxy/datamonitor/AddDataMonitor.js';

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
            .on('add', function (path, value) {
                console.log(`add ${path} = ${value}`);
            })
            .on('set', function (path, value) {
                console.log(`set ${path} = ${value}`);
            })
            // .on('set-c.*', function (prop, value) {
            //     console.log(prop, value);
            // })
            // .on('set-d.*', function (prop, value) {
            //     console.log(`d[${prop}]=${value}`);
            // })
            .on('del-d.*', function (prop) {
                console.log(`del d[${prop}]`);
            })

        var data = {
            a: 10,
            b: 20,
            c: { a: 10, b: 20 },
            d: [1, 2, 3]
        };
        data = AddDataMonitor(EE, data);

        // data.a += 10;
        // data.c.a += 30;
        // data.e = 100;
        // data.d.shift();
        // console.log(JSON.stringify(data.d));
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
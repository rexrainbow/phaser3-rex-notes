import 'phaser';
import SetItems from '../../plugins/utils/localforage/SetItems.js';
import GetItems from '../../plugins/utils/localforage/GetItems.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var data0 = { a: 10, b: 20 };
        var data1 = { c: 30, d: 40 };

        SetItems({
            key0: data0,
            key1: data1
        })
            .then(function () {
                return GetItems(['key0', 'key1'])
            })
            .then(function (data) {
                console.log(data);
            })
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
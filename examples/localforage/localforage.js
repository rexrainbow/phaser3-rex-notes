import localforage from '../../plugins/utils/storage/localforage/localforage.min.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var d = {
            a: Math.floor(Math.random() * 100),
            b: Math.floor(Math.random() * 100)
        };
        console.log(d);
        localforage.setItem('key', d)
            .then(function () {  // after setItem
                return localforage.getItem('key');
            })
            .then(function (value) {  // after getItem
                console.log(value);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    update() {}
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
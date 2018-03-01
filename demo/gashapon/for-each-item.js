import Gashapon from './../../plugins/gashapon.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
    }

    preload() {}

    create() {
        var gashapon = new Gashapon({
            mode: 'shuffle', // 0|'shuffle'|1|'random
            items: {
                a: 1,
                b: 2,
                c: 3
            }
        });

        gashapon.eachItem(function (name, count) {
            console.log(name + ": " + count);
        });
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);
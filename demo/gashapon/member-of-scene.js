import Gashapon from './../../plugins/gashapon.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
        this.gashapon;
    }

    preload() {}

    create() {
        // member of scene
        this.gashapon = new GashaponPlugin(this, {
            mode: 'shuffle', // 0|'shuffle'|1|'random
            items: {
                a: 1,
                b: 2,
                c: 3
            }
        });

        for (var i = 0; i < 12; i++) {
            console.log("Random pick: " + this.gashapon.next());
            //console.log("Last picked item: " + gashapon.result);
        }
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
import GashaponPlugin from '../../plugins/gashapon-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        });
    }

    preload() {}

    create() {
        var gashapon = this.plugins.get('rexGashapon').add({
            mode: 'shuffle', // 0|'shuffle'|1|'random
            items: {
                a: 1,
                b: 2,
                c: 3
            },
            reload: false
        });

        for (var i = 0; i < 3; i++) {
            console.log("Random pick: " + gashapon.next());
        }

        var status = gashapon.toJSON(); // get current status of gashapon
        console.log(status);
        var gashapon2 = this.plugins.get('rexGashapon').add(status); // create new Gashapon object using previous status
        for (var i = 0; i < 3; i++) {
            console.log("Random pick: " + gashapon2.next());
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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexGashapon',
            plugin: GashaponPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
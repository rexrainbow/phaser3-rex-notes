import 'phaser';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        // resolution = 1
        var txt1 = this.add.rexBBCodeText(0, 100, 'Phaser3');
        console.log(txt1.style.resolution);

        // resolution = 2
        var txt2 = this.add.rexBBCodeText(120, 100, 'Phaser3').setResolution(2);
        console.log(txt2.style.resolution);

        // resolution = 3
        var txt2 = this.add.rexBBCodeText(240, 100, 'Phaser3').setResolution(3);
        console.log(txt2.style.resolution);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 300,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
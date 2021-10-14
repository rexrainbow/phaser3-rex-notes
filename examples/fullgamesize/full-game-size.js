import 'phaser';
import FullGameSizePlugin from '../../plugins/fullgamesize-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var rect = this.add.rectangle(0, 0, 1, 1, 0x883333);
        this.plugins.get('rexFullGameSize').add(rect, {
        });

        // this.cameras.main.setZoom(0.5)
    }

}

var config = {
    type: Phaser.AUTO,
    parent: 'main',
    backgroundColor: 0x333333,
    width: 800,
    height: 600,
    scene: Demo,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        global: [{
            key: 'rexFullGameSize',
            plugin: FullGameSizePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
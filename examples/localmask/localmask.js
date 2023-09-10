import phaser from 'phaser/src/phaser.js';
import LocalMaskPlugin from '../../plugins/localmask-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('volume', 'assets/images/volume.png');
    }

    create() {
        var obj = this.add.image(400, 300, 'classroom');
        var localMask = this.plugins.get('rexLocalMask').add(obj, {
            key: 'volume'
        })

        // obj[localMask.controllerKey] = localMask;
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
    backgroundColor: '#0a0067',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexLocalMask',
            plugin: LocalMaskPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
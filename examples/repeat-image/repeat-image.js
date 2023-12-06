import phaser from 'phaser/src/phaser.js';
import RepeatImagePlugin from '../../plugins/repeatimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dude', 'assets/images/phaser-dude.png');
    }

    create() {
        var gameObject = this.add.rexRepeatImage(400, 300, 200, 200, 'dude')
            .setTileScale(2)

        this.tweens.add({
            targets: gameObject,
            tilePositionX: 200,
            tilePositionY: 100,
            duration: 3000
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexRepeatImage',
            plugin: RepeatImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
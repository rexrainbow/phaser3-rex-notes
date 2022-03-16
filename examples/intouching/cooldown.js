import phaser from 'phaser/src/phaser.js';
import InTouchingPlugin from '../../plugins/intouching-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.audio('explosion', [
            'assets/audio/soundeffect/explosion.mp3'
        ]);
    }

    create() {
        var btn = this.add.rectangle(400, 300, 96, 96, 0x888888);
        var inTouching = this.plugins.get('rexInTouching').add(btn, {
            cooldown: 300
        })
            .on('intouch', function () {
                this.sound.play('explosion');
            }, this)
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
            key: 'rexInTouching',
            plugin: InTouchingPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
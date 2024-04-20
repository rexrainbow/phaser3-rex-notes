import phaser from 'phaser/src/phaser.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.input.addPointer(1);

        var print = this.add.text(0, 0, '');

        var joyStick = this.plugins.get('rexVirtualJoyStick').add(this, {
            x: 300,
            y: 300,
            radius: 100,
            // base: this.add.circle(0, 0, 100, 0x888888),
            // thumb: this.add.circle(0, 0, 50, 0xcccccc),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })

        var button = this.add.circle(500, 300, 50).setStrokeStyle(2, 0xff0000)
            .setInteractive()
            .on('pointerdown', function () {
                print.text += 'Click Button\n';
            })
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
    // input: {
    //     activePointers: 3,
    // },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
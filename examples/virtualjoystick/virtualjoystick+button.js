import phaser from 'phaser/src/phaser.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';
import Button from '../../plugins/input/button/Button.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var joyStick = this.plugins.get('rexVirtualJoyStick').add(this, {
            x: 200,
            y: 300,
            radius: 100,
            // base: this.add.circle(0, 0, 100, 0x888888),
            // thumb: this.add.circle(0, 0, 50, 0xcccccc),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })

        var print = this.add.text(0, 0, '');
        var sprite = this.add.circle(500, 300, 50).setStrokeStyle(2, 0xff0000);
        this.input.addPointer(1);
        var btn = new Button(sprite);
        btn.on('click', function () {
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
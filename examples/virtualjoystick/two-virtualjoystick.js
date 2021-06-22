import 'phaser';
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
        this.joySticks = [
            CreateJoyStick(this, 250, 400),
            CreateJoyStick(this, 550, 400),
        ]

        this.text = this.add.text(0, 0);
    }

    update() {
        var s = []
        for (var i = 0, cnt = this.joySticks.length; i < cnt; i++) {
            var cursorKeys = this.joySticks[i].createCursorKeys();
            s.push(`[${i}] Key down: `);
            for (var name in cursorKeys) {
                if (cursorKeys[name].isDown) {
                    s.push(`${name} `);
                }
            }
            s.push('\n');
        }
        this.text.setText(s.join(''));
    }
}

var CreateJoyStick = function (scene, x, y) {
    return scene.plugins.get('rexVirtualJoyStick').add(scene, {
        x: x, y: y,
        radius: 100,
        // base: this.add.circle(0, 0, 100, 0x888888),
        // thumb: this.add.circle(0, 0, 50, 0xcccccc),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
    })
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
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
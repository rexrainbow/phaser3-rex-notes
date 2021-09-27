import 'phaser';
import KeysHubPlugin from '../../plugins/keyshub-plugin.js';
import VirtualJoyStickPlugin from '../../plugins/virtualjoystick-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var joystick = this.plugins.get('rexVirtualJoyStick').add(this, {
            x: 400,
            y: 300,
            radius: 100,
        })

        var keysHub = this.plugins.get('rexKeysHub').add(this)
            .plugKeys(this.input.keyboard.createCursorKeys())
            .plugKeys(joystick.createCursorKeys())

        this.cursorkeys = keysHub.createCursorKeys();

        this.text = this.add.text(0, 0);
    }

    update() {
        var cursorKeys = this.cursorkeys;
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }

        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }

        this.text.setText(s);
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
        global: [
            {
                key: 'rexKeysHub',
                plugin: KeysHubPlugin,
                start: true
            },
            {
                key: 'rexVirtualJoyStick',
                plugin: VirtualJoyStickPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
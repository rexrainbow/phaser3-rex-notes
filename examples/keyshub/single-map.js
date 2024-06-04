import phaser from 'phaser/src/phaser.js';
import KeysHubPlugin from '../../plugins/keyshub-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var cursorKeysInput0 = this.input.keyboard.createCursorKeys();
        var cursorKeysInput1 = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });

        var keysHub = this.plugins.get('rexKeysHub').add(this, { singleMode: true })

        var btn0, btn1;
        var PlugKeyInput0 = function () {
            keysHub.plugKeyObjectss(cursorKeysInput0);
            btn0.setColor('red')
            btn1.setColor('white')
        }
        var PlugKeyInput1 = function () {
            keysHub.plugKeyObjectss(cursorKeysInput1)
            btn1.setColor('red')
            btn0.setColor('white')
        }

        btn0 = this.add.text(300, 300, 'Cursor keys', { fontSize: 20 })
            .setInteractive()
            .on('pointerup', PlugKeyInput0)

        btn1 = this.add.text(500, 300, 'WSAD keys', { fontSize: 20 })
            .setInteractive()
            .on('pointerup', PlugKeyInput1)

        PlugKeyInput0()

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
            }
        ]
    }
};

var game = new Phaser.Game(config);
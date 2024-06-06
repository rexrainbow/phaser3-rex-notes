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
        var keysHubPlugin = this.plugins.get('rexKeysHub');
        var keysHub = keysHubPlugin.add(this, { singleMode: true });
        this.cursorkeys = keysHub.createCursorKeys();

        CreateResetKeyButton(this, 'up').setPosition(0, 200)
        CreateResetKeyButton(this, 'down').setPosition(0, 250)
        CreateResetKeyButton(this, 'left').setPosition(0, 300)
        CreateResetKeyButton(this, 'right').setPosition(0, 350)

        var activeButton = null;
        this.events.on('resetkey.start', function (keyCode, button) {
            if (activeButton) {
                return;
            }

            activeButton = button;
            button
                .setText(keyCode.toUpperCase())
                .setBackgroundColor('grey');

            this.input.keyboard.once('keydown', function (event) {
                var pressedKeyCode = keysHubPlugin.getKeyCodeFromEvent(event)
                var keyObject = this.input.keyboard.addKey(pressedKeyCode);
                keysHub.plugKeyObject(keyObject, keyCode);
                button
                    .setText(`${keyCode.toUpperCase()} : ${pressedKeyCode.toUpperCase()}`)
                    .setBackgroundColor(null);

                activeButton = null;
            }, this)
        }, this)

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

        this.text.setText(s);
    }
}

var CreateResetKeyButton = function (scene, key) {
    return scene.add.text(0, 0, key.toUpperCase(), { padding: { top: 10, bottom: 10 }, fixedWidth: 150 })
        .setInteractive()
        .on('pointerup', function () {
            scene.events.emit('resetkey.start', key, this)
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
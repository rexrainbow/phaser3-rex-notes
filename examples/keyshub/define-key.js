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

        var buttons = {
            UP: CreateResetKeyButton(this, 'UP').setPosition(0, 200),
            DOWN: CreateResetKeyButton(this, 'DOWN').setPosition(0, 250),
            LEFT: CreateResetKeyButton(this, 'LEFT').setPosition(0, 300),
            RIGHT: CreateResetKeyButton(this, 'RIGHT').setPosition(0, 350)
        };

        var UpdateButtonText = function (key) {
            var keyObject = keysHub.getKeyObjects(key);
            var displayKeyName = (keyObject) ? `: Keyboard ${keyObject.key}` : '';
            buttons[key]
                .setText(`${key} ${displayKeyName}`)
                .setBackgroundColor(null);
        }

        keysHub
            .on('definekey.start', function (key) {
                buttons[key]
                    .setText(key.toUpperCase())
                    .setBackgroundColor('grey');
            })
            .on('plug', function (key, keyObject) {
                UpdateButtonText(key);
            })
            .on('unplug', function (key, keyObject) {
                UpdateButtonText(key);
            })

        this.events
            .on('definekey.start', function (key) {
                keysHub.defineKeyStart(key).listenFromKeyboard();
            })

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
    return scene.add.text(0, 0, key, { padding: { top: 10, bottom: 10 }, fixedWidth: 200 })
        .setInteractive()
        .on('pointerup', function () {
            scene.events.emit('definekey.start', key)
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
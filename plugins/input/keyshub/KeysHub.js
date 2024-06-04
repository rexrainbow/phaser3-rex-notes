import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import KeyHub from './KeyHub.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

class KeysHub extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.keys = {};  // Dictionary of keyHubs
        this.singleMode = GetValue(config, 'singleMode', false);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        for (var keyCode in this.keys) {
            this.keys[keyCode].destroy();
        }
        this.keys = undefined;

        super.shutdown(fromScene);
    }

    plugKeyObject(keyObject, keyCode) {
        if (keyCode === undefined) {
            keyCode = keyObject.keyCode;
        }

        var keyHub = this.addKey(keyCode);
        if (this.singleMode) {
            keyHub.unplugAllKeyObject();
        }

        keyHub.plugKeyObject(keyObject);

        return this;
    }

    plugKeyObjectss(keys) {
        if (Array.isArray(keys)) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.plugKeyObject(keys[i]);
            }
        } else {
            for (var keyCode in keys) {
                this.plugKeyObject(keys[keyCode], keyCode);
            }
        }
        return this;
    }

    unplugKeyObject(keyObject) {
        var refKeyHub = keyObject.refKeyHub;
        if (refKeyHub) {
            refKeyHub.unplugKeyObject(keyObject);
        }

        return this;
    }

    unplugKeyObjects(keys) {
        if (Array.isArray(keys)) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.unplugKeyObjects(keys[i]);
            }
        } else {
            for (var keyCode in keys) {
                this.unplugKeyObjects(keys[keyCode]);
            }
        }
        return this;
    }

    addKey(keyCode) {
        if (typeof (keyCode) === 'string') {
            keyCode = KeyCodes[keyCode.toUpperCase()];
        }
        if (!this.keys.hasOwnProperty(keyCode)) {
            this.keys[keyCode] = new KeyHub(this, keyCode);
        }
        return this.keys[keyCode];
    }

    addKeys(keys) {
        var output = {};
        if (typeof (keys) === 'string') {
            keys = keys.split(',');

            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                var currentKey = keys[i].trim();

                if (currentKey) {
                    output[currentKey] = this.addKey(currentKey);
                }
            }
        } else {
            for (var key in keys) {
                output[key] = this.addKey(keys[key]);
            }
        }

        return output;
    }

    createCursorKeys() {
        return this.addKeys({
            up: KeyCodes.UP,
            down: KeyCodes.DOWN,
            left: KeyCodes.LEFT,
            right: KeyCodes.RIGHT,
            space: KeyCodes.SPACE,
            shift: KeyCodes.SHIFT
        });
    }

    getKeyObjects(keyCode) {
        if (keyCode === undefined) {
            var output = {};
            for (keyCode in this.keys) {
                var keyHubs = this.keys[keyCode].getKeyObjects();
                if (this.singleMode) {
                    output[keyCode] = keyHubs[0];
                } else {
                    output[keyCode] = keyHubs;
                }
            }
            return output;

        } else {
            return this.addKey(keyCode).getKeyObjects();

        }
    }
}

export default KeysHub;
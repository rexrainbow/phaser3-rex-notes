import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import KeyHub from './KeyHub.js';
import Methods from './methods/Methods.js';
import KeyMap from '../../utils/input/KeyMap.js';

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

        for (var key in this.keys) {
            this.keys[key].destroy();
        }
        this.keys = undefined;

        super.shutdown(fromScene);
    }

    plugKeyObject(keyObject, key) {
        if (!keyObject) {
            // Unplug/clear that keyHub
            if (key) {
                var keyHub = this.addKey(key);
                keyHub.unplugAllKeyObject();
            }
            return this;
        }

        if (!key) {
            key = KeyMap[keyObject.key];
        }

        var keyHub = this.addKey(key);
        if (this.singleMode) {
            keyHub.unplugAllKeyObject();
        }

        keyHub.plugKeyObject(keyObject);

        return this;
    }

    plugKeyObjects(keys) {
        if (Array.isArray(keys)) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.plugKeyObject(keys[i]);
            }
        } else {
            for (var key in keys) {
                this.plugKeyObject(keys[key], key);
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
            for (var key in keys) {
                this.unplugKeyObjects(keys[key]);
            }
        }
        return this;
    }

    addKey(key) {
        if (typeof (key) === 'string') {
            key = KeyCodes[key.toUpperCase()];
        }
        if (!this.keys.hasOwnProperty(key)) {
            this.keys[key] = new KeyHub(this, key);
        }
        return this.keys[key];
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

    getKeyObjects(key) {
        if (key === undefined) {
            var output = {};
            for (key in this.keys) {
                var keyHubs = this.keys[key].getKeyObjects();
                if (this.singleMode) {
                    output[key] = keyHubs[0];
                } else {
                    output[key] = keyHubs;
                }
            }
            return output;

        } else {
            return this.addKey(key).getKeyObjects();

        }
    }
}

Object.assign(
    KeysHub.prototype,
    Methods,
)

export default KeysHub;
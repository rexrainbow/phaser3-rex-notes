const Key = Phaser.Input.Keyboard.Key;
const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

class CursorKeys {
    constructor(scene) {
        this.scene = scene;

        // scene: scene instance, or undefined
        this.cursorKeys = {
            up: new Key(scene, KeyCodes.UP),
            down: new Key(scene, KeyCodes.DOWN),
            left: new Key(scene, KeyCodes.LEFT),
            right: new Key(scene, KeyCodes.RIGHT)
        }
        this.noKeyDown = true;

        // Add more keys in this dictionary
        this.keys = Object.assign({}, this.cursorKeys);
    }

    shutdown(fromScene) {
        this.scene = undefined;
        for (var key in this.keys) {
            this.keys[key].destroy();
        }
        this.keys = undefined;
        this.cursorKeys = undefined;
    }

    destroy(fromScene) {
        shutdown(fromScene);
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.keys[keyName];

        if (!key.enabled) {
            return this;
        }
        if (isDown) {
            this.noKeyDown = false;
        }

        if (key.isDown !== isDown) {
            FakeEvent.timeStamp = Date.now();
            FakeEvent.keyCode = key.keyCode;
            if (isDown) {
                key.onDown(FakeEvent);
            } else {
                key.onUp(FakeEvent);
            }
        }

        return this;
    }

    clearAllKeysState() {
        this.noKeyDown = true;
        for (var keyName in this.keys) {
            this.setKeyState(keyName, false);
        }
        return this;
    }

    getKeyState(keyName) {
        return this.keys[keyName];
    }

    get upKeyDown() {
        return this.keys.up.isDown;
    }

    get downKeyDown() {
        return this.keys.down.isDown;
    }

    get leftKeyDown() {
        return this.keys.left.isDown;
    }

    get rightKeyDown() {
        return this.keys.right.isDown;
    }

    get anyKeyDown() {
        return !this.noKeyDown;
    }

    addKey(keyName, keyCode) {
        if (keyCode === undefined) {
            keyCode = keyName;
        }

        if (typeof (keyCode) === 'string') {
            keyCode = KeyCodes[keyCode.toUpperCase()];
        }

        this.keys[keyName] = new Key(this.scene, keyCode);
        return this;
    }
}

var FakeEvent = {
    timeStamp: 0,
    keyCode: 0,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    location: 0,
};

export default CursorKeys;

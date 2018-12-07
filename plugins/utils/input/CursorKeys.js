class CursorKeys {
    constructor() {
        this.cursorKeys = {
            up: new Key(),
            down: new Key(),
            left: new Key(),
            right: new Key()
        }
        this.noKeyDown = true;
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return this;
        }

        key.isDown = isDown;
        key.isUp = !isDown;
        if (isDown) {
            this.noKeyDown = false;
        }
        return this;
    }

    clearAllKeysState() {
        this.noKeyDown = true;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }
        return this;
    }

    getKeyState(keyName) {
        return this.cursorKeys[keyName];
    }

    get upKeyDown() {
        return this.cursorKeys.up.isDown;
    }

    get downKeyDown() {
        return this.cursorKeys.down.isDown;
    }

    get leftKeyDown() {
        return this.cursorKeys.left.isDown;
    }

    get rightKeyDown() {
        return this.cursorKeys.right.isDown;
    }

    get anyKeyDown() {
        return !this.noKeyDown;
    }
}

var Key = function () {
    this.enabled = true;
    this.isUp = true;
    this.isDown = false;
}
export default CursorKeys;
import Key from "./Key";

class CursorKeysManager {
    constructor(config) {
        this.cursorKeys = {
            up: new Key(),
            down: new Key(),
            left: new Key(),
            right: new Key()
        }
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return;
        }

        var isUp = !isDown;
        key.isDown = isDown;
        key.isUp = isUp;

        // TBD
        //key._justDown = isDown;
        //key._justUp = isUp;
        //if (isDown) {
        //    key.timeDown = (new Date()).now();
        //    key.duration = 0;
        //    key.repeats++;
        //}
        //if (isUp) {
        //    key.timeUp = (new Date()).now();
        //    key.duration = key.timeUp - key.timeDown;
        //    key.repeats = 0;
        //}
    }
}
export default CursorKeysManager;

import EventKeyCodeToP3Key from '../../../utils/keyboard/EventKeyCodeToP3Key.js';

export default {
    defineKeyStart(key) {
        this.defineKeyStop();
        this.defineTargetKey = key;
        this.emit('definekey.start', key);
        return this;
    },

    defineKeyStop(keyObject) {
        if (!this.defineTargetKey) {
            return this;
        }

        this.plugKeyObject(keyObject, this.defineTargetKey);

        var defineTargetKey = this.defineTargetKey;
        this.defineTargetKey = null;

        this.emit('definekey.stop', defineTargetKey, keyObject);

        return this;
    },

    defineKeyCancel() {
        this.defineTargetKey = null;
        return this;
    },

    listenFromKeyboard() {
        var self = this;
        var keyboardManager = this.scene.input.keyboard;

        var onKeyPress = function (event) {
            var key = EventKeyCodeToP3Key(event)
            var keyObject = keyboardManager.addKey(key);
            self.defineKeyStop(keyObject);
        }
        keyboardManager.once('keydown', onKeyPress);
        self.once('definekey.stop', function () {
            keyboardManager.off('keydown', onKeyPress);
        })

        return this;
    },
}
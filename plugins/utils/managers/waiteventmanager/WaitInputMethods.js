import IsSceneObject from '../../system/IsSceneObject.js';
import Split from '../../string/Split.js';

export default {
    setClickTarget(target) {
        this.clickTarget = target;

        if (!target) {
            this.clickEE = null;
        } else if (IsSceneObject(target)) {
            this.clickEE = target.input;
        } else {  // Assume that target is a gameObject
            this.clickEE = target.setInteractive();
        }
    },

    waitClick() {
        if (!this.clickEE) {
            return this.waitTime(0);
        }

        return this.waitEvent(this.clickEE, 'pointerdown');
    },

    waitKeyDown(key) {
        var eventEmitter = this.scene.input.keyboard;
        if (typeof (key) === 'string') {
            if (key.indexOf('|') === -1) {
                return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
            } else {
                var keys = Split(key, '|');
                for (var i = 0, cnt = keys.length; i < cnt; i++) {
                    this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
                }
                return this.parent;
            }
        } else {
            return this.waitEvent(eventEmitter, 'keydown');
        }
    }
}
import IsSceneObject from '../../system/IsSceneObject';
import Split from '../../string/Split';

export default {
    setClickTarget(target?: any) {
        this.clickTarget = target;

        if (!target) {
            this.touchEE = null;
        } else if (IsSceneObject(target)) {
            this.touchEE = target.input;
        } else {  // Assume that target is a gameObject
            this.touchEE = target.setInteractive();
        }
        return this;
    },

    clearClickTarget() {
        this.setClickTarget();
        return this;
    },

    setClickShortcutKeys(keys?: any) {
        this.clickShortcutKeys = keys;
        return this;
    },

    clearClickShortcutKeys() {
        this.setClickShortcutKeys();
        return this;
    },

    waitClick() {
        var touchEE = this.touchEE;
        var clickShortcutKeys = this.clickShortcutKeys;
        if (touchEE || clickShortcutKeys) {
            if (touchEE?: any) {
                this.waitEvent(touchEE, 'pointerdown');
            }
            if (clickShortcutKeys?: any) {
                this.waitKeyDown(clickShortcutKeys);
            }
        } else {
            this.waitTime(0);
        }

        return this;
    },

    waitKeyDown(key?: any) {
        var eventEmitter = this.scene.input.keyboard;
        if (typeof (key) === 'string') {
            if (key.indexOf('|') === -1) {
                return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
            } else {
                var keys = Split(key, '|');
                for (var i = 0, cnt = keys.length; i < cnt; i++) {
                    this.waitEvent(eventEmitter, `keydown-${keys[i].toUpperCase()}`)
                }
                return this.parent;
            }
        } else {
            return this.waitEvent(eventEmitter, 'keydown');
        }
    }
}
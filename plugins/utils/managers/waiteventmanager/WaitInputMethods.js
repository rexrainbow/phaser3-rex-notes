import IsSceneObject from '../../system/IsSceneObject.js';

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
            return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
        } else {
            return this.waitEvent(eventEmitter, 'keydown');
        }
    }
}
import WaitEvent from '../../waitevent/WaitEvent.js';
import WaitTimeMethods from './WaitTimeMethods.js';
import WaitInputMethods from './WaitInputMethods.js';
import WaitGameObjectMethods from './WaitGameObjectMethods.js';
import WaitCameraMethods from './WaitCameraMethods.js';
import WaitMusicMethods from './WaitMusicMethods.js';
import WaitAny from './WaitAny.js';
import GetValue from '../../object/GetValue.js';

class WaitEventManager extends WaitEvent {
    constructor(parent, config) {
        super(parent);

        this.waitCompleteEventName = GetValue(config, 'completeEventName', this.waitCompleteEventName);

        this.setClickTarget(GetValue(config, 'clickTarget', this.scene));
        this.setCameraTarget(GetValue(config, 'camera', this.scene.cameras.main));
    }

    get clickTarget() {
        return this.parent.clickTarget;
    }

    set clickTarget(value) {
        this.parent.clickTarget = value;
    }

    get cameraTarget() {
        return this.parent.cameraTarget;
    }

    set cameraTarget(value) {
        this.parent.cameraTarget = value;
    }

    destroy() {
        this.setClickTarget();
        this.setCameraTarget();
        super.destroy();
    }

    get scene() {
        return this.parent.managersScene;
    }
}

var Methods = {
    waitAny: WaitAny,
}

Object.assign(
    WaitEventManager.prototype,
    WaitTimeMethods,
    WaitInputMethods,
    WaitGameObjectMethods,
    WaitCameraMethods,
    WaitMusicMethods,
    Methods,
)

export default WaitEventManager;
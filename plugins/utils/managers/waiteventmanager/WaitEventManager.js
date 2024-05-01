import WaitEvent from '../../waitevent/WaitEvent.js';
import Methods from './Methods.js';
import GetValue from '../../object/GetValue.js';

class WaitEventManager extends WaitEvent {
    constructor(parent, config) {
        super(parent);

        this.waitCompleteEventName = GetValue(config, 'completeEventName', this.waitCompleteEventName);

        this.setClickTarget(GetValue(config, 'clickTarget', this.scene));
        this.setClickShortcutKeys(GetValue(config, 'clickShortcutKeys', undefined));
        this.setCameraTarget(GetValue(config, 'camera', this.scene.cameras.main));
    }

    get clickTarget() {
        return this.parent.clickTarget;
    }

    set clickTarget(value) {
        this.parent.clickTarget = value;
    }

    get clickShortcutKeys() {
        return this.parent.clickShortcutKeys;
    }

    set clickShortcutKeys(value) {
        this.parent.clickShortcutKeys = value;
    }

    get cameraTarget() {
        return this.parent.cameraTarget;
    }

    set cameraTarget(value) {
        this.parent.cameraTarget = value;
    }

    destroy() {
        this.clearClickTarget();
        this.clearClickShortcutKeys();
        this.clearCameraTarget();
        super.destroy();
    }

    get scene() {
        return this.parent.managersScene;
    }
}

Object.assign(
    WaitEventManager.prototype,
    Methods,
)

export default WaitEventManager;
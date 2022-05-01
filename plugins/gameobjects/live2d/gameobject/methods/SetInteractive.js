import HitAreaCallback from './HitAreaCallback.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GameObject = Phaser.GameObjects.GameObject;

var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
    if (IsPlainObject(hitArea)) {
        hitArea.hitArea = HitAreaCallback;
        hitArea.hitAreaCallback = HitAreaCallback;
    } else {
        hitArea = HitAreaCallback;
        hitAreaCallback = HitAreaCallback;
    }

    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

    return this;
}

export default SetInteractive;
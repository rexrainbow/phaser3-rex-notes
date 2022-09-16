import SetCharacterInteractive from './SetCharacterInteractive.js';

const GameObject = Phaser.GameObjects.GameObject;

var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
    var isInteractived = !!this.input;

    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

    if (!isInteractived) {
        SetCharacterInteractive.call(this);
    }

    return this;
}

export default SetInteractive;
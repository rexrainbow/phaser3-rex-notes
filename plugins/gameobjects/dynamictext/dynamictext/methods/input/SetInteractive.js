import SetChildrenInteractive from './SetChildrenInteractive.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const GameObject = PhaserGameObjects.GameObject;

var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
    var isInteractived = !!this.input;

    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

    if (!isInteractived) {
        SetChildrenInteractive.call(this);
    }

    return this;
}

export default SetInteractive;
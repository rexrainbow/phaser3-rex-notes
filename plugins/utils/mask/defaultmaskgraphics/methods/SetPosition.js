import { GameObjects as PhaserGameObjects } from 'phaser';
const SetPositionBase = PhaserGameObjects.Graphics.prototype.setPosition;

var SetPosition = function (x, y) {
    var parent = this.parent;
    if (x === undefined) {
        x = parent.x;
    }
    if (y === undefined) {
        y = parent.y;
    }

    SetPositionBase.call(this, x, y);
    return this;
}

export default SetPosition;
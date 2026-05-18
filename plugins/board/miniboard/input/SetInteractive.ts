import HitAreaCallback from './HitAreaCallback';
import RegisterPointerEvents from './RegisterPointerEvents';
import RegisterDragEvents from './RegisterDragEvents';


import { GameObjects as PhaserGameObjects, Geom as PhaserGeom } from 'phaser';
const Rectangle = PhaserGeom.Rectangle;
const SetInteractiveBase = PhaserGameObjects.GameObject.prototype.setInteractive;

var SetInteractive = function(config?: any) {

    if (config === undefined) {
        config = {};
    }
    config.hitArea = new Rectangle(0, 0, this.width, this.height);
    config.hitAreaCallback = HitAreaCallback;

    SetInteractiveBase.call(this, config);

    RegisterPointerEvents.call(this);
    RegisterDragEvents.call(this);

    return this;
};

export default SetInteractive;
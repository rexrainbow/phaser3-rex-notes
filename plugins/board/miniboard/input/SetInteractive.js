import HitAreaCallback from './HitAreaCallback.js';
import RegisterPointerEvents from './RegisterPointerEvents.js';
import RegisterDragEvents from './RegisterDragEvents.js';


const Rectangle = Phaser.Geom.Rectangle;
const SetInteractiveBase = Phaser.GameObjects.GameObject.prototype.setInteractive;

var SetInteractive = function (config) {

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
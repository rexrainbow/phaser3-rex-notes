import Methods from './Methods.js';

var Install = function (TargetClass) {
    if (TargetClass === undefined) {
        TargetClass = class Base extends Phaser.Events.EventEmitter { }
    }

    Object.assign(
        TargetClass.prototype,
        Methods
    )
}

export default Install;
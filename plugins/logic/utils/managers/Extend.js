import Methods from './Methods.js';

var Extend = function (BaseClass) {
    debugger
    if (BaseClass === undefined) {
        BaseClass = Phaser.Events.EventEmitter;
    }
    class Base extends BaseClass { }
    Object.assign(
        Base.prototype,
        Methods
    )
    return Base;
}

export default Extend;
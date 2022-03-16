import InTouching from '../intouching/InTouching.js';

export default {
    onTouching(callback, scope, config) {
        if (!callback) {
            return this;
        }
        if (this._inTouching === undefined) {
            this._inTouching = new InTouching(this, config);
        }
        this._inTouching.on('intouch', callback, scope);
        return this;
    },

    offTouching(callback, scope) {
        if (this._click === undefined) {
            return this;
        }

        this._inTouching.off('intouch', callback, scope);
        return this;
    },
}
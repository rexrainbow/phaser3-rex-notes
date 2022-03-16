import TouchState from '../touchstate/TouchState.js';

export default {
    onTouching(callback, scope) {
        if (!callback) {
            return this;
        }
        if (this._touchState === undefined) {
            this._touchState = new TouchState(this);
        }
        this._touchState.on('intouch', callback, scope);
        return this;
    },

    offTouching(callback, scope) {
        if (this._click === undefined) {
            return this;
        }

        this._touchState.off('intouch', callback, scope);
        return this;
    },
}
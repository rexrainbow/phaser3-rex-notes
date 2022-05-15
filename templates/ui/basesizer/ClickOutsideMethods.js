import ClickOutside from '../clickoutside/ClickOutside.js';

export default {
    onClickOutside(callback, scope, config) {
        if (!callback) {
            return this;
        }
        if (this._clickOutside === undefined) {
            this._clickOutside = new ClickOutside(this, config);
        }
        this._clickOutside.on('clickoutside', callback, scope);
        return this;
    },

    offClickOutside(callback, scope) {
        if (this._clickOutside === undefined) {
            return this;
        }

        this._clickOutside.off('clickoutside', callback, scope);
        return this;
    },

    enableClickOutside(enabled) {
        if (this._clickOutside === undefined) {
            return this;
        }

        this._clickOutside.setEnable(enabled);
        return this;
    },

    disableClickOutside() {
        if (this._clickOutside === undefined) {
            return this;
        }

        this._clickOutside.setEnable(false);
        return this;
    }
}
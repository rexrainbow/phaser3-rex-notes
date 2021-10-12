import Click from '../click/Click.js';

export default {
    onClick(callback, scope, config) {
        if (!callback) {
            return this;
        }
        if (this._click === undefined) {
            this._click = new Click(this, config);
        }
        this._click.on('click', callback, scope);
        return this;
    },

    offClick(callback, scope) {
        if (this._click === undefined) {
            return this;
        }

        this._click.off('click', callback, scope);
        return this;
    },

    enableClick(enabled) {
        if (this._click === undefined) {
            return this;
        }

        this._click.setEnable(enabled);
        return this;
    },

    disableClick() {
        if (this._click === undefined) {
            return this;
        }

        this._click.setEnable(false);
        return this;
    }
}
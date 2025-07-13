import ClickOutside from '../clickoutside/ClickOutside.js';

export default {
    getClickOutsideController(gameObject, config) {
        if (!gameObject) {
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            gameObject._clickOutside = new ClickOutside(gameObject, config);
        }

        return gameObject._clickOutside;
    },

    onClickOutside(gameObject, callback, scope, config) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        this.getClickOutsideController(gameObject, config)
            .on('clickoutside', callback, scope);

        return this;
    },

    offClickOutside(gameObject, callback, scope) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            return this;
        }
        gameObject._clickOutside.off('clickoutside', callback, scope);

        return this;
    },

    enableClickOutside(gameObject, enabled) {
        if (typeof (gameObject) === 'boolean') {
            enabled = gameObject;
            gameObject = undefined;
        }

        if (gameObject === undefined) {
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            return this;
        }
        gameObject._clickOutside.setEnable(enabled);

        return this;
    },

    disableClickOutside(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            return this;
        }
        gameObject._clickOutside.setEnable(false);

        return this;
    }
}
import ClickOutside from '../clickoutside/ClickOutside.js';

var GetClickOutsideController = function (gameObject, config) {
    if (gameObject._clickOutside === undefined) {
        gameObject._clickOutside = new ClickOutside(gameObject, config);
    }

    return gameObject._clickOutside;
}

var OnClickOutside = function (gameObject, callback, scope, config) {
    GetClickOutsideController(gameObject, config)
        .on('clickoutside', callback, scope);
}

export default {
    getClickOutsideController(gameObject, config) {
        if (!gameObject) {
            gameObject = this;
        }

        return GetClickOutsideController(gameObject, config)
    },

    onClickOutside(gameObject, callback, scope, config) {
        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        OnClickOutside(gameObject, callback, scope, config);

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

export { OnClickOutside };
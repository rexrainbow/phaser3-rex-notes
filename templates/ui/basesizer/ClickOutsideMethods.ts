import ClickOutside from '../clickoutside/ClickOutside';

var GetClickOutsideController = function(gameObject?: any, config?: any) {
    if (gameObject._clickOutside === undefined) {
        gameObject._clickOutside = new ClickOutside(gameObject, config);
    }

    return gameObject._clickOutside;
}

var OnClickOutside = function(gameObject?: any, callback?: any, scope?: any, config?: any) {
    GetClickOutsideController(gameObject, config)
        .on('clickoutside', callback, scope);
}

export default {
    getClickOutsideController(gameObject?: any, config?: any) {
        if (!gameObject) {
            gameObject = this;
        }

        return GetClickOutsideController(gameObject, config)
    },

    onClickOutside(gameObject?: any, callback?: any, scope?: any, config?: any) {
        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        OnClickOutside(gameObject, callback, scope, config);

        return this;
    },

    offClickOutside(gameObject?: any, callback?: any, scope?: any) {
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

    enableClickOutside(gameObject?: any, enabled?: any) {
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

    disableClickOutside(gameObject?: any) {
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
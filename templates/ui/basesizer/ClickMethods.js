import Click from '../click/Click.js';

var GetClickController = function (gameObject, config) {
    if (gameObject._click === undefined) {
        gameObject._click = new Click(gameObject, config);
    }

    return gameObject._click;
}

var OnClick = function (gameObject, callback, scope, config) {
    GetClickController(gameObject, config)
        .on('click', callback, scope);
}

export default {
    getClickController(gameObject, config) {
        if (!gameObject) {
            gameObject = this;
        }

        return GetClickController(gameObject, config);
    },

    onClick(gameObject, callback, scope, config) {
        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        OnClick(gameObject, callback, scope, config);

        return this;
    },

    offClick(gameObject, callback, scope) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._click === undefined) {
            return this;
        }
        gameObject._click.off('click', callback, scope);

        return this;
    },

    enableClick(gameObject, enabled) {
        if (typeof (gameObject) === 'boolean') {
            enabled = gameObject;
            gameObject = undefined;
        }

        if (gameObject === undefined) {
            gameObject = this;
        }

        if (gameObject._click === undefined) {
            return this;
        }

        gameObject._click.setEnable(enabled);
        return this;
    },

    disableClick(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }

        if (gameObject._click === undefined) {
            return this;
        }
        gameObject._click.setEnable(false);

        return this;
    }
}

export { OnClick };
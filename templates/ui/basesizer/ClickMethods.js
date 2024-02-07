import Click from '../click/Click.js';

export default {
    onClick(gameObject, callback, scope, config) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._click === undefined) {
            gameObject._click = new Click(gameObject, config);
        }
        gameObject._click.on('click', callback, scope);

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
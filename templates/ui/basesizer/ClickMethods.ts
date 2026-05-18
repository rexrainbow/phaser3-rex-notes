import Click from '../click/Click';

var GetClickController = function(gameObject?: any, config?: any) {
    if (gameObject._click === undefined) {
        gameObject._click = new Click(gameObject, config);
    }

    return gameObject._click;
}

var OnClick = function(gameObject?: any, callback?: any, scope?: any, config?: any) {
    GetClickController(gameObject, config)
        .on('click', callback, scope);
}

export default {
    getClickController(gameObject?: any, config?: any) {
        if (!gameObject) {
            gameObject = this;
        }

        return GetClickController(gameObject, config);
    },

    onClick(gameObject?: any, callback?: any, scope?: any, config?: any) {
        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        OnClick(gameObject, callback, scope, config);

        return this;
    },

    offClick(gameObject?: any, callback?: any, scope?: any) {
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

    enableClick(gameObject?: any, enabled?: any) {
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

    disableClick(gameObject?: any) {
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
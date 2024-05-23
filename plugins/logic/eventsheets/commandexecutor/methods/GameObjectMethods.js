export default {
    setGOProperty(
        config,
        eventSheetManager, eventSheet
    ) {

        var { id, goType } = config;
        delete config.id;
        delete config.goType;

        if (!goType) {
            goType = this.sys.getGameObjectManagerName(id);
        }
        if (!goType) {
            return this;
        }

        for (var prop in config) {
            var value = eventSheetManager.evalExpression(config[prop]);
            this.sys.setGameObjectProperty(goType, id, prop, value);
        }
        return this;
    },

    easeGOProperty(
        config,
        eventSheetManager, eventSheet
    ) {

        var { id, goType, duration, delay, ease, repeat, yoyo, from = false, wait = true } = config;
        delete config.id;
        delete config.goType;
        delete config.duration;
        delete config.delay;
        delete config.ease;
        delete config.repeat;
        delete config.yoyo;
        delete config.from;
        delete config.wait;

        if (!goType) {
            goType = this.sys.getGameObjectManagerName(id);
        }
        if (!goType) {
            return this;
        }

        var waitProperty;
        for (var property in config) {
            var value = eventSheetManager.evalExpression(config[property]);
            this.sys.easeGameObjectProperty(goType, id, {
                property, value,
                duration, delay,
                ease,
                repeat, yoyo, from
            });

            if (!waitProperty) {
                waitProperty = property;
            }
        }
        if (wait && waitProperty) {
            this.sys.waitEventManager.waitGameObjectTweenComplete(goType, id, waitProperty);
            this._waitComplete();
        }
        return this;
    },

    destroyGO(
        config,
        eventSheetManager, eventSheet
    ) {

        var { id, goType, wait = false } = config;

        if (!goType) {
            goType = this.sys.getGameObjectManagerName(id);
        }
        if (!goType) {
            return this;
        }

        this.sys.destroyGameObject(goType, id);
        if (wait) {
            this.sys.waitEventManager.waitGameObjectDestroy(goType, id);
            this._waitComplete();
        }
        return this;
    },

    runGOMethod(
        config,
        eventSheetManager, eventSheet
    ) {

        var { id, goType, methodName, parameters } = config;

        if (!goType) {
            goType = this.sys.getGameObjectManagerName(id);
        }
        if (!goType) {
            return this;
        }

        this.sys.callGameObjectMethod(goType, config.id, methodName, ...parameters);
        return this;
    },

    getGameObject(name, out) {
        if (this.sys.hasGameObjectMananger(name)) {
            return this.sys.getGameObject(name, undefined, out);
        } else {
            return this.sys.getGameObject(undefined, name, out);
        }
    },
}
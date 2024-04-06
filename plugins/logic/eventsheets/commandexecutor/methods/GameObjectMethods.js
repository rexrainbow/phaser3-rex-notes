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
            return;
        }

        for (var prop in config) {
            var value = eventSheetManager.evalExpression(config[prop]);
            this.sys.setGameObjectProperty(goType, id, prop, value);
        }
        // Execute next command
    },

    easeGOProperty(
        config,
        eventSheetManager, eventSheet
    ) {

        var { id, goType, duration, ease, repeat, yoyo, wait = true } = config;
        delete config.id;
        delete config.goType;
        delete config.duration;
        delete config.ease;
        delete config.repeat;
        delete config.yoyo;
        delete config.wait;

        if (!goType) {
            goType = this.sys.getGameObjectManagerName(id);
        }
        if (!goType) {
            return;
        }

        var waitProperty;
        for (var prop in config) {
            var value = eventSheetManager.evalExpression(config[prop]);
            this.sys.easeGameObjectProperty(goType, id, prop, value, duration, ease, repeat, yoyo);

            if (!waitProperty) {
                waitProperty = prop;
            }
        }
        if (wait && waitProperty) {
            return this.sys.waitEventManager.waitGameObjectTweenComplete(goType, id, waitProperty);
        }

        // Execute next command
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
            return;
        }

        this.sys.destroyGameObject(goType, id);
        if (wait) {
            return this.sys.waitEventManager.waitGameObjectDestroy(goType, id);
        }
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
            return;
        }

        this.sys.callGameObjectMethod(goType, config.id, methodName, ...parameters);
        // Execute next command
    },
}
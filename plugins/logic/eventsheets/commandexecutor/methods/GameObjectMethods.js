export default {
    addGameObjectManager(config) {
        // Register GameObjectManager
        var sys = this.sys;
        sys.addGameObjectManager(config);

        var { name, defaultLayer, commands = {} } = config;

        // Add custom commands
        sys.getGameObjectManager(name).commands = commands;

        // Add createGameObject command
        var createGameObjectCallback = function (config, eventSheetManager) {
            var { id, layer = defaultLayer } = config;
            delete config.id;
            delete config.layer;

            sys.createGameObject(name, id, config);
            // Execute next command

            if (layer) {
                var layerManager = sys.layerManager;
                if (layerManager) {
                    var gameObject = sys.getGameObject(name, id);
                    layerManager.addToLayer(layer, gameObject);
                }
            }
        }
        this.addCommand(name, createGameObjectCallback, null);

        return this;
    },

    addGameObjectCommand(goType, commandName, callback) {
        this.sys.getGameObjectManager(goType).commands[commandName] = callback;
        return this;
    },

    _setGOProperty(config, eventSheetManager, eventsheet) {
        var { id } = config;
        delete config.id;

        var goType = this.sys.getGameObjectManagerName(id);
        if (!goType) {
            return;
        }

        for (var prop in config) {
            var value = eventSheetManager.evalExpression(config[prop]);
            this.sys.setGameObjectProperty(goType, id, prop, value);
        }
        // Execute next command
    },

    _easeGOProperty(config, eventSheetManager, eventsheet) {
        var { id, duration, ease, repeat, yoyo, wait = true } = config;
        delete config.id;
        delete config.duration;
        delete config.ease;
        delete config.repeat;
        delete config.yoyo;
        delete config.wait;

        var goType = this.sys.getGameObjectManagerName(id);
        if (!goType) {
            return;
        }

        var waitProperty;
        for (var prop in config) {
            var value = eventSheetManager.evalExpression(config[prop]);
            this.sys.easeGameObjectProperty(goType, id, prop, value, duration, ease, repeat, yoyo);
            waitProperty = prop;
        }
        if (wait && waitProperty) {
            return this.sys.waitEventManager.waitGameObjectTweenComplete(goType, id, waitProperty);
        }

        // Execute next command
    },

    _destroyGO(
        {
            id,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var goType = this.sys.getGameObjectManagerName(id);
        if (!goType) {
            return;
        }

        this.sys.destroyGameObject(goType, id);
        if (wait) {
            return this.sys.waitEventManager.waitGameObjectDestroy(goType, id);
        }
    },

    _runGOMethod(config, eventSheetManager, eventsheet) {
        var goType = this.sys.getGameObjectManagerName(id);
        if (!goType) {
            return;
        }

        this.sys.callGameObjectMethod(goType, config.id, config.methodName, ...config.parameters);
        // Execute next command
    },
}
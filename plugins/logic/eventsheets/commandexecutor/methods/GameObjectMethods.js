export default {
    addGameObjectManager(config) {
        // Register GameObjectManager
        var sys = this.sys;
        sys.addGameObjectManager(config);

        var { name, defaultLayer, commands = {} } = config;

        // Add custom commands
        sys.getGameObjectManager(name).commands = commands;

        // Add createGameObject command        
        var goType = name;
        var createGameObjectCallback = function (config, manager) {
            var { name, layer = defaultLayer } = config;
            sys.createGameObject(goType, name, config);
            // Execute next command

            if (layer) {
                var layerManager = sys.getGameObjectManager('layer');
                if (layerManager) {
                    var gameObject = sys.getGameObject(goType, name);
                    layerManager.addToLayer(layer, gameObject);
                }
            }
        }
        this.addCommand(goType, createGameObjectCallback, null);

        return this;
    },

    _setGOProperty(config, manager) {
        var { name } = config;
        delete config.name;
        for (var prop in config) {
            var value = manager.evalExpression(config[prop]);
            this.sys.setGameObjectProperty(undefined, name, prop, value);
        }
        // Execute next command
    },

    _easeGOProperty(config, manager) {
        var { name, duration, ease, repeat, yoyo, wait = true } = config;
        delete config.name;
        delete config.duration;
        delete config.ease;
        delete config.repeat;
        delete config.yoyo;
        delete config.wait;

        var waitProperty;
        for (var prop in config) {
            var value = manager.evalExpression(config[prop]);
            this.sys.easeGameObjectProperty(undefined, name, prop, value, duration, ease, repeat, yoyo);
            waitProperty = prop;
        }
        if (wait && waitProperty) {
            return this.sys.waitEventManager.waitGameObjectTweenComplete(undefined, name, waitProperty);
        }

        // Execute next command
    },

    _runGOMethod(config, manager) {
        this.sys.callGameObjectMethod(undefined, config.name, config.methodName, ...config.parameters);
        // Execute next command
    },
}
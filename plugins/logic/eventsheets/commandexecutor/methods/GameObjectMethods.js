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
            delete config.name;
            delete config.layer;

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

        var goType = this.sys.getGameObjectManagerName(name);
        if (!goType) {
            return;
        }

        for (var prop in config) {
            var value = manager.evalExpression(config[prop]);
            this.sys.setGameObjectProperty(goType, name, prop, value);
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

        var goType = this.sys.getGameObjectManagerName(name);
        if (!goType) {
            return;
        }

        var waitProperty;
        for (var prop in config) {
            var value = manager.evalExpression(config[prop]);
            this.sys.easeGameObjectProperty(goType, name, prop, value, duration, ease, repeat, yoyo);
            waitProperty = prop;
        }
        if (wait && waitProperty) {
            return this.sys.waitEventManager.waitGameObjectTweenComplete(goType, name, waitProperty);
        }

        // Execute next command
    },

    _destroyGO({ name, wait = false } = {}, manager) {
        var goType = this.sys.getGameObjectManagerName(name);
        if (!goType) {
            return;
        }

        this.sys.destroyGameObject(goType, name);
        if (wait) {
            return this.sys.waitEventManager.waitGameObjectDestroy(goType, name);
        }
    },

    _runGOMethod(config, manager) {
        var goType = this.sys.getGameObjectManagerName(name);
        if (!goType) {
            return;
        }

        this.sys.callGameObjectMethod(goType, config.name, config.methodName, ...config.parameters);
        // Execute next command
    },
}
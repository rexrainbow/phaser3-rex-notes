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

}
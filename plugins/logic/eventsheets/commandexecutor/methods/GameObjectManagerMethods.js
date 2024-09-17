import AddEvent from '../../../../utils/gameobject/addevent/AddEvent.js';

export default {
    addGameObjectManager(config) {
        // Register GameObjectManager
        var sys = this.sys;
        sys.addGameObjectManager(config);

        var {
            name, defaultLayer,
            commands = {},
            autoClear = true
        } = config;

        // Add custom commands
        var gameObjectManager = sys.getGameObjectManager(name);
        gameObjectManager.commands = commands;

        var defaultAutoClear = autoClear;

        // Add createGameObject command
        var createGameObjectCallback = function (config, eventSheetManager, eventsheet) {
            var {
                id,
                layer = defaultLayer,
                autoClear = defaultAutoClear
            } = config;

            config.commandExecutor = this;
            config.eventSheetManager = eventSheetManager;
            config.eventsheet = eventsheet;

            sys.createGameObject(name, id, config);
            // Execute next command

            delete config.commandExecutor;
            delete config.eventSheetManager;
            delete config.eventsheet;

            if (layer) {
                var layerManager = sys.layerManager;
                if (layerManager) {
                    var gameObject = sys.getGameObject(name, id);
                    layerManager.addToLayer(layer, gameObject);
                }
            }

            // Put reference of game object into memory
            var memoryKey = `@${id}`;
            if (eventSheetManager.hasData(memoryKey)) {
                console.warn(`CommandExecutor: Duplicated GameObject ID=${id}`);
            }
            eventSheetManager.setData(memoryKey, gameObject);
            gameObject.once('destroy', function () {
                eventSheetManager.removeData(memoryKey);
            })

            if (autoClear) {
                var gameObject = sys.getGameObject(name, id);

                // When exit this eventsheet, destroy this game object (remove from gameObjectManager)
                AddEvent(
                    gameObject,
                    eventSheetManager, 'eventsheet.exit',
                    function (title, groupName, eventSheetManager) {
                        if ((eventsheet.title === title) && (eventsheet.groupName === groupName)) {
                            gameObjectManager.remove(id, true);
                        }
                    }
                );
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
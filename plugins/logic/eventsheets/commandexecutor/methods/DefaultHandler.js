import StringToValues from '../../../../utils/string/StringToValues.js';

var DefaultHandler = function (name, config, eventSheetManager, eventSheet) {
    var tokens = name.split('.');

    var gameObjectID = tokens[0];
    if (this.sys.hasGameObjectMananger(gameObjectID)) {
        config.goType = gameObjectID;
        config.id = null;
    } else if (this.sys.hasGameObject(undefined, gameObjectID)) {
        config.goType = undefined;
        config.id = gameObjectID;
    } else {
        // TODO
        console.warn(`CommandExecutor: '${gameObjectID}' does not exist`);
        return this;
    }

    this.bindEventSheetManager(eventSheetManager); // For _waitComplete() / waitEvent()

    var commandName = tokens[1];

    var isDone = false;
    // Try to run custom command first
    var gameObjectManager = this.sys.getGameObjectManager(config.goType, config.id);
    if (gameObjectManager) {
        // Command registered in gameObjectManager
        var command = gameObjectManager.commands[commandName];
        if (command) {
            var gameObjects = gameObjectManager.getGO(config.id);
            if (!Array.isArray(gameObjects)) {
                gameObjects = [gameObjects];
            }
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                command(gameObjects[i], config, this, eventSheetManager, eventSheet);
            }
            isDone = true;
        }
    }

    if (!isDone) {
        // Try run default command
        switch (commandName) {
            case 'set':
                this.setGOProperty(config, eventSheetManager, eventSheet);
                break;

            case 'to':
                this.easeGOProperty(config, eventSheetManager, eventSheet);
                break;

            case 'yoyo':
                config.yoyo = true;
                this.easeGOProperty(config, eventSheetManager, eventSheet);
                break;

            case 'from':
                config.from = true;
                this.easeGOProperty(config, eventSheetManager, eventSheet);
                break;

            case 'destroy':
                this.destroyGO(config, eventSheetManager, eventSheet);
                break;

            default:
                // TODO
                var parameters;
                for (var key in config) {
                    parameters = config[key];
                    break;
                }
                config.methodName = commandName;
                config.parameters = (parameters) ? StringToValues(parameters) : [];
                this.runGOMethod(config, eventSheetManager, eventSheet);
                break;
        }

    }

    this.unBindEventSheetManager();

    return this;
}

export default DefaultHandler;
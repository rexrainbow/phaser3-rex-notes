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
        return;
    }

    var commandName = tokens[1];
    switch (tokens[1]) {
        case 'set':
            return this.setGOProperty(config, eventSheetManager, eventSheet);

        case 'to':
            return this.easeGOProperty(config, eventSheetManager, eventSheet);

        case 'yoyo':
            config.yoyo = true;
            return this.easeGOProperty(config, eventSheetManager, eventSheet);

        case 'destroy':
            return this.destroyGO(config, eventSheetManager, eventSheet);

        default:
            var gameObjectManager = this.sys.getGameObjectManager(config.goType, config.id);
            if (gameObjectManager) {
                // Command registered in gameObjectManager
                var command = gameObjectManager.commands[commandName];
                if (command) {
                    this.clearWaitEventFlag();

                    var gameObjects = gameObjectManager.getGO(config.id);
                    if (!Array.isArray(gameObjects)) {
                        gameObjects = [gameObjects];
                    }
                    var self = this;
                    gameObjects.forEach(function (gameObject) {
                        command(gameObject, config, self, eventSheetManager, eventSheet);
                    })

                    return (this.hasAnyWaitEvent) ? this.sys : undefined;
                }
            }

            var parameters;
            for (var key in config) {
                parameters = config[key];
                break;
            }
            config.methodName = commandName;
            config.parameters = (parameters) ? StringToValues(parameters) : [];
            return this._runGOMethod(config, eventSheetManager, eventSheet);

    }
}

export default DefaultHandler;
import StringToValues from '../../../../utils/string/StringToValues.js';

var DefaultHandler = function (name, config, eventSheetManager, eventsheet) {
    var tokens = name.split('.');

    var gameObjectID = tokens[0];
    switch (tokens.length) {
        case 1:
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

            return this._setGOProperty(config, eventSheetManager, eventsheet);

        case 2:
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
                case 'to':
                    return this._easeGOProperty(config, eventSheetManager, eventsheet);

                case 'yoyo':
                    config.yoyo = true;
                    return this._easeGOProperty(config, eventSheetManager, eventsheet);

                case 'destroy':
                    return this._destroyGO(config, eventSheetManager, eventsheet);

                default:
                    var gameObjectManager = this.sys.getGameObjectManager(config.goType, config.id);
                    if (gameObjectManager) {
                        // Command registered in gameObjectManager
                        var command = gameObjectManager.commands[commandName];
                        if (command) {
                            this.clearWaitEventFlag();

                            var gameObjects = gameObjectManager.getGO(gameObjectID);
                            if (!Array.isArray(gameObjects)) {
                                gameObjects = [gameObjects];
                            }
                            var self = this;
                            gameObjects.forEach(function (gameObject) {
                                command(gameObject, config, self, eventSheetManager, eventsheet);
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
                    return this._runGOMethod(config, eventSheetManager, eventsheet);

            }
    }
}

export default DefaultHandler;
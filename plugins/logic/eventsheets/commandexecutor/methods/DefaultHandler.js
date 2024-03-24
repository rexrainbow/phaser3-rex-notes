import StringToValues from '../../../../utils/string/StringToValues.js';

var DefaultHandler = function (name, config, eventSheetManager, eventsheet) {
    var tokens = name.split('.');

    var gameObjectID = tokens[0];
    config.id = gameObjectID;
    switch (tokens.length) {
        case 1:
            if (!this.sys.hasGameObject(undefined, gameObjectID)) {
                // TODO
                console.warn(`CommandExecutor: '${gameObjectID}' does not exist`);
                return;
            }
            return this._setGOProperty(config, eventSheetManager, eventsheet);

        case 2:
            if (!this.sys.hasGameObject(undefined, gameObjectID)) {
                // TODO
                console.warn(`CommandExecutor: '${gameObjectID}' does not exist`);
                return;
            }

            var commandName = tokens[1]
            switch (tokens[1]) {
                case 'to':
                    return this._easeGOProperty(config, eventSheetManager, eventsheet);

                case 'yoyo':
                    config.yoyo = true;
                    return this._easeGOProperty(config, eventSheetManager, eventsheet);

                case 'destroy':
                    return this._destroyGO(config, eventSheetManager, eventsheet);

                default:
                    var gameObjectManager = this.sys.getGameObjectManager(undefined, gameObjectID);
                    if (gameObjectManager) {
                        var command = gameObjectManager.commands[commandName];
                        if (command) {
                            var gameObject = gameObjectManager.getGO(gameObjectID);
                            this.clearWaitEventFlag();
                            command(gameObject, config, this, eventSheetManager, eventsheet);
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
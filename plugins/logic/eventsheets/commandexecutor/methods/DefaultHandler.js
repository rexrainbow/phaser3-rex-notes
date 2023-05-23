import StringToValues from '../../../../utils/string/StringToValues.js';

var DefaultHandler = function (name, config, manager) {
    var tokens = name.split('.');

    var gameObjectName = tokens[0];
    config.name = gameObjectName;
    switch (tokens.length) {
        case 1:
            if (!this.sys.hasGameObject(undefined, gameObjectName)) {
                // TODO
                console.warn(`CommandExecutor: '${gameObjectName}' does not exist`);
                return;
            }
            return this._setGOProperty(config, manager);

        case 2:
            if (!this.sys.hasGameObject(undefined, gameObjectName)) {
                // TODO
                console.warn(`CommandExecutor: '${gameObjectName}' does not exist`);
                return;
            }

            var commandName = tokens[1]
            switch (tokens[1]) {
                case 'to':
                    return this._easeGOProperty(config, manager);

                case 'yoyo':
                    config.yoyo = true;
                    return this._easeGOProperty(config, manager);

                case 'destroy':
                    return this._destroyGO(config, manager);

                default:
                    var gameObjectManager = this.sys.getGameObjectManager(undefined, gameObjectName);
                    if (gameObjectManager) {
                        var command = gameObjectManager.commands[commandName];
                        if (command) {
                            var gameObject = gameObjectManager.getGO(gameObjectName);
                            this.clearWaitEventFlag();
                            command(gameObject, config, this);
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
                    return this._runGOMethod(config, manager);

            }
    }
}

export default DefaultHandler;
import StringToValues from '../../../../utils/string/StringToValues.js';

var DefaultHandler = function (name, config, manager) {
    var tokens = name.split('.');

    config.name = tokens[0];
    switch (tokens.length) {
        case 1:
            return this._setGOProperty(config, manager);

        case 2:
            switch (tokens[1]) {
                case 'to':
                    return this._easeGOProperty(config, manager);

                case 'yoyo':
                    config.yoyo = true;
                    return this._easeGOProperty(config, manager);

                default:
                    var gameObjectManager = this.sys.getGameObjectManager(undefined, tokens[0]);
                    if (gameObjectManager) {
                        var command = gameObjectManager.commands[tokens[1]];
                        if (command) {
                            var gameObject = gameObjectManager.getGO(tokens[0]);
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
                    config.methodName = tokens[1];
                    config.parameters = (parameters) ? StringToValues(parameters) : [];
                    return this._runGOMethod(config, manager);

            }
    }
}

export default DefaultHandler;
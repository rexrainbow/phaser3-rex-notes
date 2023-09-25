var RegisterInputHandler = function (config) {
    var isValidInputHandler = true;

    if (!config.hasOwnProperty('accept')) {
        isValidInputHandler = false;
        console.error(`[Tweaker] Can't register inputHandler '${config.name}', missing 'accept' callback.`);
    }
    if (!config.hasOwnProperty('build')) {
        isValidInputHandler = false;
        console.error(`[Tweaker] Can't register inputHandler '${config.name}', missing 'build' callback.`);
    }

    if (isValidInputHandler) {
        this.inputHandlers.unshift(config);
    }

    return this;
}

export default RegisterInputHandler;
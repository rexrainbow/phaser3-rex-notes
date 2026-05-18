var RegisterInputHandler = function(config?: any) {
    var isValidInputHandler = true;

    if (!config.hasOwnProperty('accept')) {
        isValidInputHandler = false;
        console.error(`[Tweaker] Can't register inputHandler '${config.name}', missing 'accept' callback.`);
    }
    if (!config.hasOwnProperty('build')) {
        isValidInputHandler = false;
        console.error(`[Tweaker] Can't register inputHandler '${config.name}', missing 'build' callback.`);
    }

    if (isValidInputHandler?: any) {
        this.inputHandlers.unshift(config);
    }

    return this;
}

export default RegisterInputHandler;
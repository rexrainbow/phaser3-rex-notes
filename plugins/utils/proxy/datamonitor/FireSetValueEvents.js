var FireSetValueEvents = function (eventEmitter, prefix, prop, value, prevValue) {
    var propPath = (prefix === '') ? prop : `${prefix}.${prop}`;
    eventEmitter.emit(`set-${propPath}`, value, prevValue);

    var propStarPath = (prefix === '') ? '*' : `${prefix}.*`
    eventEmitter.emit(`set-${propStarPath}`, prop, value, prevValue);

    eventEmitter.emit(`set`, propPath, value, prevValue);
}

export default FireSetValueEvents;
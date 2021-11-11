var FireDeleteKeyEvents = function (eventEmitter, prefix, property) {
    var propPath = (prefix === '') ? property : `${prefix}.${property}`;
    eventEmitter.emit(`del-${propPath}`);

    var propStarPath = (prefix === '') ? '*' : `${prefix}.*`
    eventEmitter.emit(`del-${propStarPath}`, property);

    eventEmitter.emit(`del`, propPath);
}

export default FireDeleteKeyEvents;
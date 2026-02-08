var ResolveKeyPath = function (target, keyPath) {
    var bindingTarget = target;
    var bindingKey = keyPath;
    var valid = true;

    if (bindingTarget && (typeof (keyPath) === 'string') && (keyPath.indexOf('.') !== -1)) {
        var keys = keyPath.split('.');
        bindingKey = keys.pop();
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            bindingTarget = bindingTarget[keys[i]];
            if (!bindingTarget) {
                valid = false;
                break;
            }
        }
    }

    return {
        target: bindingTarget,
        key: bindingKey,
        valid: valid
    };
}

export default ResolveKeyPath;
var ResolveKeyPath = function (target, keyPath) {
    if (!target) {
        return false;
    }

    var bindingTarget = target;
    var bindingKey = keyPath;

    if (bindingTarget && (typeof (keyPath) === 'string') && (keyPath.indexOf('.') !== -1)) {
        var keys = keyPath.split('.');
        bindingKey = keys.pop();
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            bindingTarget = bindingTarget[keys[i]];
            if (!bindingTarget) {
                return false;
            }
        }
    }

    return {
        target: bindingTarget,
        key: bindingKey
    };
}

export default ResolveKeyPath;
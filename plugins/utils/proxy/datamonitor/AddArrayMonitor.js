// TODO
var AddArrayMonitor = function (data, eventEmitter, prefix) {
    return new Proxy(data, {
        set(target, prop, value) {
            Reflect.set(target, prop, value);
            return true;
        },
    });
}

export default AddArrayMonitor;
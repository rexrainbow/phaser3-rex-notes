// TODO
var AddArrayMonitor = function (eventEmitter, data, prefix) {
    return new Proxy(data, {
        set(target, prop, value) {
            Reflect.set(target, prop, value);
            return true;
        },
    });
}

export default AddArrayMonitor;
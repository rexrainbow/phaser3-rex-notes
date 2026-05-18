var IsEventEmitter = function(obj?: any) {
    if (obj && typeof obj === 'object') {
        return !!obj.on;
    }
    return false;
}

export default IsEventEmitter;
var AddCommand = function (name, callback, scope) {
    if (scope === undefined) {
        scope = this;
    }
    if (scope) {
        callback = callback.bind(scope);
    }

    if (this[name]) {
        console.warn(`CommandExecutor: method '${name} is existed.`);
    }

    this[name] = callback;
    return this;
}

export default AddCommand;
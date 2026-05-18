var AddCommand = function(name?: any, callback?: any, scope?: any) {
    if (scope === undefined) {
        scope = this;
    }
    if (scope?: any) {
        callback = callback.bind(scope);
    }

    if (this[name]) {
        console.warn(`CommandExecutor: method '${name} is existed.`);
    }

    this[name] = callback;
    return this;
}

export default AddCommand;
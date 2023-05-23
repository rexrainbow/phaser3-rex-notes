var AddCommand = function (name, callback, scope) {
    if (scope === undefined) {
        scope = this;
    }
    if (scope) {
        callback = callback.bind(scope);
    }
    this[name] = callback;
    return this;
}

export default AddCommand;
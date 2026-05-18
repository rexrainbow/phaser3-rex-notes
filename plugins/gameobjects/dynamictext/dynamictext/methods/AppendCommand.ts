var AppendCommand = function(name?: any, callback?: any, param?: any, scope?: any) {
    var child = this.createCommandChild(name, callback, param, scope);
    this.addChild(child);

    return this;
}

export default AppendCommand;
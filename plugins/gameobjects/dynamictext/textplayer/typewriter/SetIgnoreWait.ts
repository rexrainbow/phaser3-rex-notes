var SetIgnoreWait = function(value?: any) {
    if (value === undefined) {
        value = true;
    }
    this.ignoreWait = value;
    return this;
}

export default SetIgnoreWait;
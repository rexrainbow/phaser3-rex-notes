var SetIgnoreNextPageInput = function(enable?: any) {
    if (enable === undefined) {
        enable = true;
    }
    this.ignoreNextPageInput = enable;
    return this;
}

export default SetIgnoreNextPageInput;
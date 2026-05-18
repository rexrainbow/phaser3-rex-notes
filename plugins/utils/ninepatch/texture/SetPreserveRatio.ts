var SetPreserveRatio = function(enable?: any) {
    if (enable == undefined) {
        enable = true;
    }

    this.preserveRatio = enable;
    return this;
}

export default SetPreserveRatio;
var SetSkipSpaceEnable = function(enable?: any) {
    if (enable === undefined) {
        enable = true;
    }
    this.skipSpaceEnable = enable;
    return this;
}

export default SetSkipSpaceEnable;
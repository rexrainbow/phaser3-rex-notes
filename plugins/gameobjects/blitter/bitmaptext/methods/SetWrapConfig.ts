var SetWrapConfig = function(config?: any) {
    if (config === undefined) {
        config = {};
    }

    this.wrapConfig = config;
    return this;
}

export default SetWrapConfig;
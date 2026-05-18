var GetProperty = function(name?: any, config?: any, defaultConfig?: any) {
    if (config.hasOwnProperty(name)) {
        return config[name];
    } else {
        return defaultConfig[name];
    }
}

export default GetProperty;
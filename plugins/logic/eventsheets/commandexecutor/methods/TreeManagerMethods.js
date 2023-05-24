export default {
    // TODO: More commands
    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    },
}
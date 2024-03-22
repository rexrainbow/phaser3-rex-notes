export default {
    // TODO: More commands
    setData(config, eventSheetManager, tree) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    },

    incData(config, eventSheetManager, tree) {
        for (var name in config) {
            eventSheetManager.incData(name, config[name]);
        }
    },

    toggleData(config, eventSheetManager, tree) {
        for (var name in config) {
            eventSheetManager.toggleData(name, config[name]);
        }
    },
}
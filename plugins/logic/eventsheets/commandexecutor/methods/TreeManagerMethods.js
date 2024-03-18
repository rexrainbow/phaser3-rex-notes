export default {
    // TODO: More commands
    setData(config, eventSheetManager) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    },

    incData(config, eventSheetManager) {
        for (var name in config) {
            eventSheetManager.incData(name, config[name]);
        }
    }
}
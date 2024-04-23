export default {
    setData(config, eventSheetManager, eventsheet) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    },

    incData(config, eventSheetManager, eventsheet) {
        for (var name in config) {
            eventSheetManager.incData(name, config[name]);
        }
    },

    toggleData(config, eventSheetManager, eventsheet) {
        for (var name in config) {
            eventSheetManager.toggleData(name, config[name]);
        }
    },
}
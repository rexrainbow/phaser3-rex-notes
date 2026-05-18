export default {
    setData(config?: any, eventSheetManager?: any, eventsheet?: any) {
        for (var name in config) {
            eventSheetManager.setData(name, config[name]);
        }
    },

    incData(config?: any, eventSheetManager?: any, eventsheet?: any) {
        for (var name in config) {
            eventSheetManager.incData(name, config[name]);
        }
    },

    toggleData(config?: any, eventSheetManager?: any, eventsheet?: any) {
        for (var name in config) {
            eventSheetManager.toggleData(name, config[name]);
        }
    },
}
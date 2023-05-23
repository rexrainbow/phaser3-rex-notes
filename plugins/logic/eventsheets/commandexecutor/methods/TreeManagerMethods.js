export default {
    // TODO: More commands
    set(config, manager) {
        for (var name in config) {
            // TODO: string variable does not have to eval
            var value = manager.evalExpression(config[name]);
            manager.setData(name, value);
        }
    },
}
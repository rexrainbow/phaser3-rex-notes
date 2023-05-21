export default {
    wait(config, manager) {
        var { time } = config;
        if (time !== undefined) {
            config.time = manager.evalExpression(time);
        }
        return this.sys.waitEventManager.waitAny(config);
    },

    click(config, manager) {
        return this.wait({ click: true }, manager);
    }
}
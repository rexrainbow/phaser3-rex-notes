var CanLog = function (eventsheet) {
    return !eventsheet.hasOwnProperty('logEnable') || eventsheet.logEnable;
}

export default {
    log({
        text = '',
        logType = 'log',
        showTitle = true,
        title = undefined,
        titleColor = 'green'
    } = {},
        eventSheetManager, eventsheet
    ) {
        if (!CanLog(eventsheet)) {
            return this;
        }

        if (showTitle) {
            if (title === undefined) {
                title = eventsheet.title;
            }
            text = `[round][bgcolor=${titleColor}]${title}[/bgcolor][/round] ${text}`
        }
        this.sys.logger.log(text, logType);
        return this;
    },

    'log.disable'(
        {
            title
        } = {},
        eventSheetManager, eventsheet
    ) {

        if (title) {
            eventsheet = eventSheetManager.getTree(title, eventsheet.groupName);
        }

        if (!eventsheet.hasOwnProperty('logEnable')) {
            eventsheet.wrapProperty('logEnable');
        }

        eventsheet.logEnable = false;
        return this;
    },

    'log.enable'(
        {
            title
        } = {},
        eventSheetManager, eventsheet
    ) {

        if (title) {
            eventsheet = eventSheetManager.getTree(title, eventsheet.groupName);
        }

        if (!eventsheet.hasOwnProperty('logEnable')) {
            return this;
        }

        eventsheet.logEnable = true;
        return this;
    },

    'log.memory'(config, eventSheetManager, eventsheet) {
        if (!CanLog(eventsheet)) {
            return this;
        }

        this.log(config, eventSheetManager, eventsheet);

        var memory = eventSheetManager.memory;

        var table;
        var { keys } = config;
        if (keys) {
            table = {};
            keys.split(',').forEach(function (key) {
                table[key] = memory[key];
            })
        } else {
            table = memory
        }

        this.sys.logger.log(table);
        return this;
    },
}
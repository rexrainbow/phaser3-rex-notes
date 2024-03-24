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
            return;
        }

        if (showTitle) {
            if (title === undefined) {
                title = eventsheet.title;
            }
            text = `[round][bgcolor=${titleColor}]${title}[/bgcolor][/round] ${text}`
        }
        this.sys.logger.log(text, logType);
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
            return
        }

        eventsheet.logEnable = true;

    },

    'log.memory'(config, eventSheetManager, eventsheet) {
        if (!CanLog(eventsheet)) {
            return;
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
            table = memory;
        }

        this.sys.logger.log(table, 'table');
    },
}
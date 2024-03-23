var CanLog = function (tree) {
    return !tree.hasOwnProperty('logEnable') || tree.logEnable;
}

export default {
    log({
        text = '',
        logType = 'log',
        showTitle = true,
        title = undefined,
        titleColor = 'green'
    } = {},
        eventSheetManager, tree
    ) {
        if (!CanLog(tree)) {
            return;
        }

        if (showTitle) {
            if (title === undefined) {
                title = tree.title;
            }
            text = `[round][bgcolor=${titleColor}]${title}[/bgcolor][/round] ${text}`
        }
        this.sys.logger.log(text, logType);
    },

    'log.disable'(
        {
            title
        } = {},
        eventSheetManager, tree
    ) {

        if (title) {
            tree = eventSheetManager.getTree(title, tree.groupName);
        }

        if (!tree.hasOwnProperty('logEnable')) {
            tree.wrapProperty('logEnable');
        }

        tree.logEnable = false;

    },

    'log.enable'(
        {
            title
        } = {},
        eventSheetManager, tree
    ) {

        if (title) {
            tree = eventSheetManager.getTree(title, tree.groupName);
        }

        if (!tree.hasOwnProperty('logEnable')) {
            return
        }

        tree.logEnable = true;

    },

    'log.memory'(config, eventSheetManager, tree) {
        if (!CanLog(tree)) {
            return;
        }

        this.log(config, eventSheetManager, tree);

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
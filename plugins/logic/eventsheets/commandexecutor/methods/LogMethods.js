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

        if (showTitle) {
            if (title === undefined) {
                title = tree.title;
            }
            text = `[round][bgcolor=${titleColor}]${title}[/bgcolor][/round] ${text}`
        }
        this.sys.logger.log(text, logType);
    },

    enableLog(
        {
            enable = true
        } = {},
        eventSheetManager, tree
    ) {

        this.sys.logger.setEnable(enable);
    },
}
var SetAutoTypingEnable = function (
    gameObject,
    {
        enable = true,
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {
    enable = !!enable;

    eventSheetManager.setData('$autoNextPage', enable);

    if (enable && gameObject.isPageEnd) {
        // Typing next page automatically with 0 delay.
        var autoNextPageDelay = eventSheetManager.getData('$autoNextPageDelay');
        eventSheetManager.setData('$autoNextPageDelay', 0);

        gameObject._typeNextPage();

        eventSheetManager.setData('$autoNextPageDelay', autoNextPageDelay);
    }
}

export default SetAutoTypingEnable;
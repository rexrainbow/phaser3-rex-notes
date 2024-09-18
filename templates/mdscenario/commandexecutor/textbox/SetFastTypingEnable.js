var SetFastTypingEnable = function (
    gameObject,
    {
        enable = true,
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {
    enable = !!enable;

    eventSheetManager.setData('$fastTyping', enable);

    if (enable) {
        var fastTypingSpeed = eventSheetManager.getData('$fastTypingSpeed');
        gameObject.setTypeSpeed(fastTypingSpeed);
    } else {
        var defaultTypingSpeed = eventSheetManager.getData('$typingSpeed');
        gameObject.setTypeSpeed(defaultTypingSpeed);
    }
}

export default SetFastTypingEnable;
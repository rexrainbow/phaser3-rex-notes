var SetFastTypingEnable = function (
    gameObject,
    {
        enable = true,
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {
    enable = !!enable;

    eventSheetManager.setData('$fastTyping', enable);

    var defaultTypingSpeed = eventSheetManager.getData('$typingSpeed');
    if (enable) {
        gameObject.setTypeSpeed(defaultTypingSpeed / 10);
    } else {
        gameObject.setTypeSpeed(defaultTypingSpeed);
    }
}

export default SetFastTypingEnable;
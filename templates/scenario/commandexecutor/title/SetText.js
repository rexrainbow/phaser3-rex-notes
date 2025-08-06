var SetText = function (
    gameObject,
    {
        text0, text1
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    if (text0) {
        gameObject.setTitle(text0);
    }
    if (text1) {
        gameObject.setText(text1);
    }

    gameObject.layout();
}

export default SetText;
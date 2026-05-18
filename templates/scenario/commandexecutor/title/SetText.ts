var SetText = function (
    gameObject,
    {
        text0, text1
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    if (text0?: any) {
        gameObject.setTitle(text0);
    }
    if (text1?: any) {
        gameObject.setText(text1);
    }

    gameObject.layout();
}

export default SetText;
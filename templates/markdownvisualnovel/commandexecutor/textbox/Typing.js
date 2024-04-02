var Typing = function (
    gameObject,
    {
        name,
        text,
        speed
    } = {},
    commandExecutor,
    eventSheetManager, eventSheet
) {

    if (name) {
        var title = gameObject.getElement('title').setText(name);
        gameObject.setChildAlpha(title, 1);
    } else {
        var title = gameObject.getElement('title').setText('');
        gameObject.setChildAlpha(title, 0);
    }
    gameObject.layout();

    // Wait until typing complete
    commandExecutor.waitEvent(gameObject, 'complete');
    gameObject.start(text, speed);
};

export default Typing;
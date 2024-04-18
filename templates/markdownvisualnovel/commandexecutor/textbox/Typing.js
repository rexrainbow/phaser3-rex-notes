var Typing = function (
    gameObject,
    {
        text,
        name,
        icon, iconFrame,
        expression,
        speed
    } = {},
    commandExecutor,
    eventSheetManager
) {

    if (name) {
        var title = gameObject.getElement('title').setText(name);
        gameObject.setChildAlpha(title, 1);
    } else {
        var title = gameObject.getElement('title').setText('');
        gameObject.setChildAlpha(title, 0);
    }

    if (expression) {
        var frameDelimiter = gameObject.frameDelimiter;
        iconFrame = name + frameDelimiter + expression;
    }

    if (icon || iconFrame) {
        var iconGameObject = gameObject.getElement('icon');
        if (!icon) {
            icon = iconGameObject.texture.key;
        }
        iconGameObject.setTexture(icon, iconFrame);
    }
    gameObject.layout();

    // Wait until typing complete
    commandExecutor.waitEvent(gameObject, 'complete');
    gameObject.start(text, speed);
};

export default Typing;
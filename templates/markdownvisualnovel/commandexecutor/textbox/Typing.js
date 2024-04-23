var Typing = function (
    gameObject,
    {
        text,
        displayName,
        icon, iconFrame,
        name, expression,
        speed
    } = {},
    commandExecutor,
    eventSheetManager, eventSheet
) {

    if (displayName) {
        var title = gameObject.getElement('title').setText(displayName);
        gameObject.setChildAlpha(title, 1);
    } else {
        var title = gameObject.getElement('title').setText('');
        gameObject.setChildAlpha(title, 0);
    }

    if (expression) {
        if (name === undefined) {
            name = displayName;
        }
        var frameDelimiter = gameObject.frameDelimiter;
        iconFrame = name + frameDelimiter + expression;
    }

    if (speed === undefined) {
        speed = eventSheetManager.getData('$typingSpeed');
    }

    var iconGameObject = gameObject.getElement('icon');
    if (icon === null) {
        gameObject.hide(iconGameObject);
    } else {
        gameObject.show(iconGameObject);
    }

    if (icon || iconFrame) {
        var iconGameObject = gameObject.getElement('icon');
        if (!icon) {
            icon = iconGameObject.texture.key;
        }
        iconGameObject.setTexture(icon, iconFrame);
    }
    gameObject.layout();

    if (text) {
        // Wait until typing complete
        commandExecutor.waitEvent(gameObject, 'complete');
        gameObject.start(text, speed);
    }
};

export default Typing;
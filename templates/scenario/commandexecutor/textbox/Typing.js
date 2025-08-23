var Typing = function (
    gameObject,
    {
        text,
        displayName,
        icon, iconFrame,
        name, expression,
        typingSpeed,
        iconCrossDuration, iconCrossMode = 'crossFade',
        waitIconAnimationMode,
        more = false,
        clickAfterComplete = true,
        wait = true,
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {

    if (displayName === null) {
        var title = gameObject.getElement('title').setText('');
        gameObject.setChildAlpha(title, 0);
    } else if (displayName) {
        var title = gameObject.getElement('title').setText(displayName);
        gameObject.setChildAlpha(title, 1);
    }

    var iconGameObject = gameObject.getElement('icon');
    if (iconGameObject) {
        if (name || expression) {
            var frameDelimiter = gameObject.frameDelimiter;
            var tokens = gameObject.frame.name.split(frameDelimiter);
            name = name || tokens[0];
            expression = expression || tokens[1];
            iconFrame = name + frameDelimiter + expression;
        }

        if (icon || iconFrame) {
            icon = icon || iconGameObject.texture.key;
            iconFrame = iconFrame || '__BASE';

            // Don't do transition if texture is not changed
            if ((icon !== iconGameObject.texture.key) || (iconFrame !== iconGameObject.frame.name)) {
                if (iconCrossDuration === undefined) {
                    iconCrossDuration = eventSheetManager.getData('$transitionDuration');
                }
                iconGameObject.setDuration(iconCrossDuration);
                iconGameObject.transit(icon, iconFrame, iconCrossMode);
            }

        }

        if (icon === null) {
            gameObject.hide(iconGameObject);
        } else {
            gameObject.show(iconGameObject);
        }
    }

    gameObject.layout();

    if (text) {
        /* 
        Using $fastTypingSpeed speed in $fastTyping mode,
        Otherwise using custom typingSpeed, or default typing speed
        */

        // Store gameObject.normalTypingSpeed
        if (typingSpeed === undefined) {
            gameObject.normalTypingSpeed = eventSheetManager.getData('$typingSpeed');
        } else {
            gameObject.normalTypingSpeed = typingSpeed;
        }

        var fastTyping = eventSheetManager.getData('$fastTyping');
        if (fastTyping) {
            typingSpeed = eventSheetManager.getData('$fastTypingSpeed');
        } else if (typingSpeed === undefined) {
            typingSpeed = gameObject.normalTypingSpeed;
        }

        if (clickAfterComplete) {
            // Wait until typing complete, then one more clicking.
            commandExecutor.waitEvent(gameObject, 'complete2');
        } else if (wait) {
            // Wait until typing complete
            commandExecutor.waitEvent(gameObject, 'complete');
        }

        if (!more) {
            gameObject.start(text, typingSpeed);
        } else {
            gameObject.more(text, typingSpeed);
        }
        gameObject.complete2Flag = false;
        // Fire 'start' event, see GenerateDefaultCreateGameObjectCallback
    }

    if (waitIconAnimationMode) {
        var icon = gameObject.getElement('action');
        if (icon && icon.setAnimationMode) {
            icon.setAnimationMode(waitIconAnimationMode);
        }
    }
};

export default Typing;

var Cross = function (
    gameObject,
    {
        key, frame,
        name, expression,
        duration, mode = 'crossFade',
        wait = true
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    if (gameObject.isFrameNameMode) {
        key = key || gameObject.texture.key;
        if (name || expression) {
            var frameDelimiter = gameObject.frameDelimiter;
            var tokens = gameObject.frame.name.split(frameDelimiter);
            name = name || tokens[0];
            expression = expression || tokens[1];
            frame = name + frameDelimiter + expression;
        }

    } else {
        key = name || gameObject.texture.key;
        frame = expression;
    }

    if (!frame) {
        frame = '__BASE';
    }
    // Don't do transition if texture is not changed
    if ((key === gameObject.texture.key) && (frame === gameObject.frame.name)) {
        return;
    }

    if (duration === undefined) {
        duration = eventSheetManager.getData('$transitionDuration');
    }

    // Wait until transition complete
    if (wait) {
        commandExecutor.waitEvent(gameObject, 'complete');
    }

    gameObject.setDuration(duration);
    gameObject.transit(key, frame, mode);
}

export default Cross;
var Cross = function (
    gameObject,
    {
        key, frame,
        duration,
        mode = 'fade',
        wait = true
    } = {},
    commandExecutor,
    eventSheetManager, eventSheet
) {

    key = key || gameObject.texture.key;

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
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

    // Wait until transition complete
    if (wait) {
        commandExecutor.waitEvent(gameObject, 'complete');
    }

    if (duration === undefined) {
        duration = eventSheetManager.getData('$transitionDuration');
    }

    var durationSave = gameObject.duration;
    if (duration !== undefined) {
        gameObject.setDuration(duration);
    }
    gameObject.transit(key, frame, mode);
    gameObject.setDuration(durationSave);
}

export default Cross;
import CrossBase from '../utils/Cross.js';

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
        } else {
            frame = gameObject.frame.name;
        }

    } else {
        key = name || gameObject.texture.key;
        frame = expression;
    }

    CrossBase(
        gameObject,
        {
            key, frame,
            duration, mode,
            wait
        },
        commandExecutor, eventSheetManager, eventSheet
    );
}

export default Cross;
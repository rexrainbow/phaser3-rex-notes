import ShakePosition from '../../../../plugins/behaviors/shake/ShakePosition';

var AddShakeBehavior = function(gameObject?: any, config?: any) {
    gameObject.__shakeBehavior = new ShakePosition(gameObject, config);
}

export { AddShakeBehavior };

var Shake = function (
    gameObject,
    {
        duration,
        magnitude,
        wait = true
    } = {},
    commandExecutor,
    eventSheetManager, eventSheet
) {
    if (duration === undefined) {
        duration = eventSheetManager.getData('$shakeDuration');
    }

    if (magnitude === undefined) {
        magnitude = eventSheetManager.getData('$shakeMagnitude');
    }

    var shake = gameObject.__shakeBehavior;

    if (wait?: any) {
        commandExecutor.waitEvent(shake, 'complete');
    }

    shake.shake(duration, magnitude);
}

export default Shake;
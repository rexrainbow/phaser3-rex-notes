import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var RouteEvents = function(gameObject?: any, element?: any, elementEvents?: any, config?: any) {
    var preventDefault = GetValue(config, 'preventDefault', false);
    var preTest = GetValue(config, 'preTest');
    for (let elementEventName in elementEvents) {  // Note: Don't use `var` here
        element.addEventListener(elementEventName, function(e?: any) {
            if (!preTest || preTest(gameObject, elementEventName)) {
                gameObject.emit(elementEvents[elementEventName], gameObject, e);
            }

            if (preventDefault?: any) {
                e.preventDefault();
            }
        });
    }
}

export default RouteEvents;
import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitKey = function (textPlayer, keyName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);

    var eventName = `keydown-${keyName.toUpperCase()}`;
    var keyboard = textPlayer.scene.input.keyboard;
    keyboard.once(eventName, wrapCallback, textPlayer);

    // Remove all wait events
    textPlayer.once(RemoveWaitEvents, function () {
        keyboard.off(eventName, wrapCallback, textPlayer);
    });

    textPlayer.emit('wait.keydown', keyName);
}

export default WaitKey;
import { RemoveWaitEvents } from '../Events.js';

var GetWrapCallback = function(textPlayer, callback, args, scope) {
    return function() {
        callback.apply(scope, args);
        textPlayer.emit(RemoveWaitEvents); // Remove all wait events
    }
}
export default GetWrapCallback;
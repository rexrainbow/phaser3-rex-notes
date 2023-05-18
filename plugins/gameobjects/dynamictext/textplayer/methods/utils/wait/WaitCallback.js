import GetWrapCallback from './GetWrapCallback.js';

var WaitCallback = function (textPlayer, postfixName, callback, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, scope, 'custom');

    var eventName = (postfixName) ? `wait.${postfixName}` : 'wait';
    textPlayer.emit(eventName, wrapCallback);
}

export default WaitCallback;

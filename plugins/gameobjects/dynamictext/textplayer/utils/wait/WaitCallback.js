import GetWrapCallback from './GetWrapCallback.js';

var WaitCallback = function (textPlayer, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);

    textPlayer.emit('wait', wrapCallback);
}

export default WaitCallback;

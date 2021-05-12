var DelayCall = function (textPlayer, delay, callback, args, scope) {
    return textPlayer.typeWriter.timeline.delayCall(delay, callback, args, scope);
}

export default DelayCall;
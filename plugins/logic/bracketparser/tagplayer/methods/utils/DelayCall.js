var DelayCall = function (tagPlayer, delay, callback, args, scope) {
    return tagPlayer.timeline.delayCall(delay, callback, args, scope);
}

export default DelayCall;
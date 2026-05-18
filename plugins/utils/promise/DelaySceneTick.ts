var DelaySceneTick = function(scene?: any, s?: any, result?: any) {
    if (s === undefined) {
        s = 0;
    }
    return new Promise(function(resolve?: any, reject?: any) {
        scene.time.delayedCall(s, resolve, [result]);
    });
}

export default DelaySceneTick;
var NextTick = function(scene?: any, callback?: any, scope?: any) {
    return scene.time.delayedCall(0, callback, [], scope);
}

export default NextTick;
var PostUpdateDelayCall = function (gameObject, delay, callback, scope) {
    // Invoke callback under scene's 'postupdate' event
    var scene = gameObject.scene;
    var sceneEE = scene.sys.events;
    var timer = scene.time.delayedCall(
        delay,                            // delay
        sceneEE.once,                     // callback
        ['postupdate', callback, scope],  // args
        sceneEE                           // scope
    );
    return timer;
}

export default PostUpdateDelayCall;
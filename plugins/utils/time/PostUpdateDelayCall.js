var PostUpdateDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'postupdate' event
    var scene = gameObject.scene;
    var sceneEE = scene.sys.events;
    var timer = scene.time.delayedCall(
        delay,                            // delay
        sceneEE.once,                     // callback
        [
            // Event name of scene
            'postupdate',
            // Callback
            function () {
                callback.call(scope, args);
            }
        ],  // args
        sceneEE                           // scope, scene's EE
    );
    return timer;
}

export default PostUpdateDelayCall;
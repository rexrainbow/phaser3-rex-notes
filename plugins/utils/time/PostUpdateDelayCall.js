var PostUpdateDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'postupdate' event
    var scene = gameObject.scene;
    var timer = scene.time.delayedCall(delay, function () {
        scene.sys.events.once('postupdate', function () {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default PostUpdateDelayCall;
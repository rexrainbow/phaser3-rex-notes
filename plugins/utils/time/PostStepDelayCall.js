var PostStepDelayCall = function (gameObject, delay, callback, scope, args) {
    // Invoke callback under game's 'poststep' event
    var scene = gameObject.scene;
    var timer = scene.time.delayedCall(delay, function () {
        scene.game.events.once('poststep', function () {
            callback.call(scope, args);
        });
    })
    return timer;
}

export default PostStepDelayCall;
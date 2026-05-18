import GetSceneObject from '../system/GetSceneObject';

var PostStepDelayCall = function(gameObject?: any, delay?: any, callback?: any, scope?: any, args?: any) {
    // Invoke callback under game's 'poststep' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function() {
        scene.game.events.once('poststep', function() {
            callback.call(scope, args);
        });
    })
    return timer;
}

export default PostStepDelayCall;
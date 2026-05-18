import GetSceneObject from '../system/GetSceneObject';

var PostUpdateDelayCall = function(gameObject?: any, delay?: any, callback?: any, scope?: any, args?: any) {
    // Invoke callback under scene's 'postupdate' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function() {
        scene.sys.events.once('postupdate', function() {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default PostUpdateDelayCall;
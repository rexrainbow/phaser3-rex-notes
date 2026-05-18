import GetSceneObject from '../system/GetSceneObject';

var UpdateDelayCall = function(gameObject?: any, delay?: any, callback?: any, scope?: any, args?: any) {
    // Invoke callback under scene's 'update' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function() {
        scene.sys.events.once('update', function() {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default UpdateDelayCall;
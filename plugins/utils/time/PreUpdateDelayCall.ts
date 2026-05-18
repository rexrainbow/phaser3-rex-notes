import GetSceneObject from '../system/GetSceneObject';

var PreUpdateDelayCall = function(gameObject?: any, delay?: any, callback?: any, scope?: any, args?: any) {
    // Invoke callback under scene's 'preupdate' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function() {
        scene.sys.events.once('preupdate', function() {
            callback.call(scope, args);
        })
    })
    return timer;
}

export default PreUpdateDelayCall;
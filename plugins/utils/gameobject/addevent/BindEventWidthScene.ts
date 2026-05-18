var BindEventWidthScene = function(scene?: any, eventEmitter?: any, eventName?: any, callback?: any, scope?: any, once?: any) {
    if (once === undefined) {
        once = false;
    }

    eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

    scene.sys.events.once('shutdown', function() {
        eventEmitter.off(eventName, callback, scope);
    });

    return scene;
}

export default BindEventWidthScene;
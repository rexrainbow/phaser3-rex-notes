var BindEventWidthScene = function (scene, eventEmitter, eventName, callback, scope, once) {
    if (once === undefined) {
        once = false;
    }

    eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

    scene.sys.events.once('shutdown', function () {
        eventEmitter.off(eventName, callback, scope);
    });

    return scene;
}

export default BindEventWidthScene;
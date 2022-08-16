import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var IsWaitGameObject = function (tagPlayer, name) {    
    var names = name.split('.');
    return tagPlayer.gameObjectManagers.hasOwnProperty(names[0]);
}

var WaitGameObject = function (tagPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope);
    var tags = tag.split('.');
    var goType = tags[0];
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    var waitEventName = `wait.${goType}`
    switch (tags.length) {
        case 1:  // 'goType' : wait all sprites has beeen destroyed
            if (gameObjectManager.isEmpty) {
                tagPlayer.emit(waitEventName);
                wrapCallback();
            } else {
                // Remove all wait events
                tagPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    gameObjectManager.off('empty', wrapCallback, tagPlayer);
                });
                gameObjectManager.once('empty', wrapCallback, tagPlayer);
                tagPlayer.emit(waitEventName);
            }
            break;

        case 2:  // 'goType.name' : wait goType.name has been destroyed
            var name = tags[1];
            if (gameObjectManager.has(name)) {
                var spriteData = gameObjectManager.get(name);
                var gameObject = spriteData.gameObject;
                // Remove all wait events
                tagPlayer.once(RemoveWaitEvents, function () {
                    gameObject.off('destroy', wrapCallback, tagPlayer);
                });

                gameObject.once('destroy', wrapCallback, tagPlayer);
                tagPlayer.emit(waitEventName, name);
            } else {
                tagPlayer.emit(waitEventName, name);
                wrapCallback();
            }
            break;

        case 3:  // 'goType.name.prop' : wait ease goType.name.prop has been completed
            var name = tags[1],
                prop = tags[2];
            var value = gameObjectManager.getProperty(name, prop);
            if (typeof (value) === 'number') {
                // Can start tween task for a number property
                var task = gameObjectManager.getTweenTask(name, prop);
                if (task) {
                    // Remove all wait events
                    tagPlayer.once(RemoveWaitEvents, function () {
                        task.off('complete', wrapCallback, tagPlayer);
                    });

                    task.once('complete', wrapCallback, tagPlayer);
                    tagPlayer.emit(waitEventName, name, prop);
                } else {
                    tagPlayer.emit(waitEventName, name, prop);
                    wrapCallback();
                }
            } else {

            }
            break;

        default:
            break;
    }

}


export { IsWaitGameObject, WaitGameObject };
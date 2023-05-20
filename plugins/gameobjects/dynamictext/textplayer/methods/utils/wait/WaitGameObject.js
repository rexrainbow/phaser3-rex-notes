var IsWaitGameObject = function (textPlayer, name) {
    var names = name.split('.');
    return textPlayer.gameObjectManagers.hasOwnProperty(names[0]);
}

var WaitGameObject = function (textPlayer, tag, callback, scope) {
    var waitEventManager = textPlayer.waitEventManager;
    var tags = tag.split('.');
    var goType = tags[0];
    var gameObjectManager = textPlayer.getGameObjectManager(goType);
    var waitEventName = `wait.${goType}`
    switch (tags.length) {
        case 1:  // 'goType' : wait all sprites has beeen destroyed
            waitEventManager.waitGameObjectManagerEmpty(goType);
            textPlayer.emit(waitEventName);
            return;

        case 2:  // 'goType.name' : wait goType.name has been destroyed
            var name = tags[1];
            waitEventManager.waitGameObjectDestroy(goType, name);
            textPlayer.emit(waitEventName, name);
            return;

        case 3:  // 'goType.name.prop' : wait ease goType.name.prop has been completed
            var name = tags[1],
                prop = tags[2];

            var value = gameObjectManager.getProperty(name, prop);
            // Can start tween task for a number property
            if (typeof (value) === 'number') {
                waitEventManager.waitGameObjectTweenComplete(goType, name, prop);
                textPlayer.emit(waitEventName, name, prop);
                return;
            }

            var dataKey = prop;
            var matchFalseFlag = dataKey.startsWith('!');
            if (matchFalseFlag) {
                dataKey = dataKey.substring(1);
            }
            // Wait until flag is true/false
            if (gameObjectManager.hasData(name, dataKey)) {
                waitEventManager.waitGameObjectDataFlag(goType, name, dataKey, !matchFalseFlag);
                textPlayer.emit(waitEventName, name, dataKey);
                return;
            } else {
                waitEventManager.waitTime(0);
                return;
            }

    }

}


export { IsWaitGameObject, WaitGameObject };
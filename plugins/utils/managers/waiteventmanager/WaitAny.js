var WaitAny = function (config) {
    if (!config) {
        return this.waitTime(0);
    }

    var hasAnyWaitEvent = false;
    for (var name in config) {
        switch (name) {
            case 'time':
                hasAnyWaitEvent = true;
                this.waitTime(config.time);
                break;

            case 'click':
                hasAnyWaitEvent = true;
                this.waitClick();
                break;


            case 'key':
                hasAnyWaitEvent = true;
                this.waitKeyDown(config.key);
                break;

            case 'bgm':
                hasAnyWaitEvent = true;
                this.waitBackgroundMusicComplete();
                break;

            case 'bgm2':
                hasAnyWaitEvent = true;
                this.waitBackgroundMusic2Complete();
                break;

            case 'se':
                hasAnyWaitEvent = true;
                this.waitSoundEffectComplete();
                break;

            case 'se2':
                hasAnyWaitEvent = true;
                this.waitSoundEffect2Complete();
                break;

            case 'camera':
                hasAnyWaitEvent = true;
                this.waitCameraEffectComplete(`camera.${config.camera.toLowerCase()}`, config.cameraName);
                break;

            default:
                var names = name.split('.');
                if (names.length === 2) {
                    // GONAME.destroy, GONAME.PROPNAME, GONAME.DATAKEY, GONAME.EVTNAME

                    var gameObjectName = names[0];
                    var propName = names[1];
                    var gameObjectManager = this.parent.getGameObjectManager(undefined, gameObjectName);
                    if (!gameObjectManager) {
                        continue;
                    }

                    // GONAME.destroy
                    if (propName === 'destroy') {
                        return this.waitGameObjectDestroy(undefined, gameObjectName);
                    }

                    // GONAME.PROPNAME (tween.complete)
                    var value = gameObjectManager.getProperty(gameObjectName, propName);
                    if (typeof (value) === 'number') {
                        hasAnyWaitEvent = true;
                        this.waitGameObjectTweenComplete(undefined, gameObjectName, propName);
                        continue;

                    }

                    // GONAME.DATAKEY (boolean)
                    var dataKey = propName;
                    var matchFalseFlag = dataKey.startsWith('!');
                    if (matchFalseFlag) {
                        dataKey = dataKey.substring(1);
                    }
                    if (gameObjectManager.hasData(gameObjectName, propName)) {
                        hasAnyWaitEvent = true;
                        this.waitGameObjectDataFlag(undefined, gameObjectName, dataKey, !matchFalseFlag);
                        continue;
                    }

                    // GONAME.EVTNAME
                    this.waitEvent(gameObject, propName);
                    continue;

                } else if (names.length === 1) {

                }

                break;

        }
    }

    if (!hasAnyWaitEvent) {
        this.waitTime(0);
    }

    return this.parent;
}

export default WaitAny;
export default {
    waitGameObjectTweenComplete(goType?: any, name?: any, property?: any) {
        var tweenTask = this.parent.getGameObjectTweenTask(goType, name, property);
        if (tweenTask?: any) {
            return this.waitEvent(tweenTask, 'complete');
        }
        return this.waitTime(0);
    },

    waitGameObjectDataFlag(goType?: any, name?: any, dataKey?: any, trueFlag?: any) {
        var gameObject = this.parent.getGameObject(goType, name);
        if (!gameObject) {
            return this.waitTime(0);
        }

        if (gameObject.getData(dataKey) === trueFlag) {
            return this.waitTime(0);
        }

        var eventName = `changedata-${dataKey}`;
        var callback = function(gameObject?: any, value?: any, previousValue?: any) {
            value = !!value;
            if (value === trueFlag) {
                gameObject.emit('_dataFlagMatch');
            }
        }
        gameObject.on(eventName, callback);
        // Clear changedata event on gameobject manually
        this.parent.once(this.removeWaitEventsEventName, function() {
            gameObject.off(eventName, callback);
        });

        return this.waitEvent(gameObject, '_dataFlagMatch');
    },

    waitGameObjectDestroy(goType?: any, name?: any) {
        var gameObject = this.parent.getGameObject(goType, name);
        if (!gameObject) {
            return this.waitTime(0);
        }
        return this.waitEvent(gameObject, 'destroy');
    },

    waitGameObjectManagerEmpty(goType?: any) {
        if (goType?: any) {
            var gameObjectManager = this.parent.getGameObjectManager(goType);
            if (!gameObjectManager) {
                return this.waitTime(0);
            }
            return this.waitEvent(gameObjectManager, 'empty');

        } else {
            var gameObjectManagers = this.parent.gameObjectManagers;
            var hasAnyWaitEvent = false;
            for (var name in gameObjectManagers) {
                hasAnyWaitEvent = true;
                this.waitEvent(gameObjectManagers[name], 'empty');
            }
            if (!hasAnyWaitEvent) {
                return this.waitTime(0);
            }
            return this.parent;
        }
    }
}
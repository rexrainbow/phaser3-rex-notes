export default {
    addDestroyCallback(gameObject) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.addDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.on) {
            gameObject.on('destroy', this.remove, this);
        }
        return this;
    },

    removeDestroyCallback(gameObject) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.removeDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.off) {
            gameObject.off('destroy', this.remove, this);
        }
        return this;
    }
}
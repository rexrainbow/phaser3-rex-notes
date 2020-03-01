import IsArray from '../../utils/object/IsArray.js';

export default {
    setDestroyCallback(callback, scope) {
        this.destroyCallback = callback;
        this.destroyCallbackScope = scope;
        return this;
    },

    addDestroyCallback(gameObject) {
        if ((!gameObject) || (!this.destroyCallback)) {
            return this;
        }

        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.addDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.on) {
            gameObject.on('destroy', this.destroyCallback, this.destroyCallbackScope);
        }
        return this;
    },

    removeDestroyCallback(gameObject) {
        if ((!gameObject) || (!this.destroyCallback)) {
            return this;
        }

        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.removeDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.off) {
            gameObject.off('destroy', this.destroyCallback, this.destroyCallbackScope);
        }
        return this;
    }
}
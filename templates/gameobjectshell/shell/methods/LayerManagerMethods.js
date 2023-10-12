export default {
    addToBackgroundLayer(gameObject) {
        this.layerManager.addToLayer(this.backgroundLayerName, gameObject);
        return this;
    },

    addToMonitorLayer(gameObjects) {
        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }

        var self = this;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            let gameObject = gameObjects[i];

            this.layerManager.addToLayer(this.monitorLayerName, gameObject);

            gameObject.setInteractive();

            if (!gameObject.removeFromMonitorLayerCallback) {
                var shell = this;
                var onSelectGameObject = function () {
                    shell.onSelectGameObjectCallback(shell, gameObject);
                }
                gameObject.on('pointerdown', onSelectGameObject);
                gameObject.removeFromMonitorLayerCallback = function () {
                    gameObject.removeFromMonitorLayerCallback = undefined;
                    gameObject.off('pointerdown', onSelectGameObject);
                }
            }
        }

        return this;
    },

    removeFromMonitorLayer(gameObject, addToScene) {
        this.layerManager.removeFromLayer(this.monitorLayerName, gameObject, addToScene);
        if (gameObject.removeFromMonitorLayerCallback) {
            gameObject.removeFromMonitorLayerCallback();
        }
        return this;
    },

    clearMonitorLayer() {
        this.layerManager.clearLayer(this.monitorLayerName);
        return this;
    },

    addToUILayer(gameObject) {
        this.layerManager.addToLayer(this.uiLayerName, gameObject);
        return this;
    },

    getBackgroundLayer() {
        return this.layerManager.getLayer(this.backgroundLayerName);
    },

    getMonitorLayer() {
        return this.layerManager.getLayer(this.monitorLayerName);
    },

    getUILayer() {
        return this.layerManager.getLayer(this.uiLayerName);
    },

    getMonitorGameObjects() {
        return this.layerManager.getLayer(this.monitorLayerName).getAll();
    },

}
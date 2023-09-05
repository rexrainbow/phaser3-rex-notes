import LayerManager from '../../layermanager/LayerManager.js';

export default {
    addLayerManager(config) {
        var layers = config.layers;
        if (!Array.isArray(layers)) {
            layers = [];
        }

        this.backgroundLayerName = layers[0] || 'background';
        this.monitorLayerName = layers[1] || 'monitor';
        this.uiLayerName = layers[2] || 'ui';

        var layerManager = config.layerManager;
        this.isPrivateLayerManager = !layerManager;
        if (this.isPrivateLayerManager) {
            layerManager = new LayerManager(this.scene, {
                layers: [
                    this.backgroundLayerName,
                    this.monitorLayerName,
                    this.uiLayerName
                ]
            })
        }
        this.layerManager = layerManager;

        return this;
    },

    addToBackgroundLayer(gameObject) {
        this.layerManager.addToLayer(this.backgroundLayerName, gameObject);
        return this;
    },

    addToMonitorLayer(gameObjects) {
        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            let gameObject = gameObjects[i];
            let isMonitored = this.isMonitored(gameObject);

            this.layerManager.addToLayer(this.monitorLayerName, gameObject);

            if (!isMonitored) {
                gameObject
                    .setInteractive()
                    .on('pointerdown', function () {
                        this.setBindingTarget(gameObject);
                    }, this)
            }
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

    isMonitored(gameObject) {
        return this.layerManager.getLayer(this.monitorLayerName).exists(gameObject);
    },

}
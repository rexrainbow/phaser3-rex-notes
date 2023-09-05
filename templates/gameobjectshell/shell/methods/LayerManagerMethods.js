import LayerManager from '../../layermanager/LayerManager.js';

export default {
    addLayerManager(config) {
        var layers = config.layers;
        if (!Array.isArray(layers)) {
            layers = [];
        }

        this.backgroundLayerName = layers[0] || 'background';
        this.mainLayerName = layers[1] || 'main';
        this.uiLayerName = layers[2] || 'ui';

        var layerManager = config.layerManager;
        this.isPrivateLayerManager = !layerManager;
        if (this.isPrivateLayerManager) {
            layerManager = new LayerManager(this.scene, {
                layers: [
                    this.backgroundLayerName,
                    this.mainLayerName,
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

    addToMainLayer(gameObject) {
        this.layerManager.addToLayer(this.mainLayerName, gameObject);
        return this;
    },

    addToUILayer(gameObject) {
        this.layerManager.addToLayer(this.uiLayerName, gameObject);
        return this;
    },


}
import LayerManager from '../../layermanager/LayerManager.js';

var CreateLayerManager = function (config) {
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

    this.once('destroy', function () {
        if (this.isPrivateLayerManager) {
            this.layerManager.destroy(fromScene);
        } else {
            var layNames = [this.backgroundLayerName, this.monitorLayerName, this.uiLayerName];
            for (var i = 0, cnt = layNames.length; i < cnt; i++) {
                this.layerManager.clearLayer(layNames[i], !fromScene);
            }
        }
        this.layerManager = undefined;
    }, this)

    return layerManager;
}

export default CreateLayerManager;
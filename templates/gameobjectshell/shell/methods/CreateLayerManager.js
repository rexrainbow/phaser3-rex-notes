import LayerManager from '../../layermanager/LayerManager.js';
import { LayerConfigMultipleCamras } from './Layers.js';

var CreateLayerManager = function (config) {
    this.layerManager = new LayerManager(this.scene, {
        layers: LayerConfigMultipleCamras,
        rootLayer: config.rootLayer,
    })

    this.once('destroy', function () {
        this.layerManager.destroy(fromScene);
        this.layerManager = undefined;
    }, this)

    return this.layerManager;
}

export default CreateLayerManager;
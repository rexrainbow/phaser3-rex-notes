import LayerManager from '../../layermanager/LayerManager';
import { LayerConfigMultipleCamras } from './Layers';

var CreateLayerManager = function(config?: any) {
    this.layerManager = new LayerManager(this.scene, {
        layers: LayerConfigMultipleCamras,
        rootLayer: config.rootLayer,
    })

    this.once('destroy', function() {
        this.layerManager.destroy(fromScene);
        this.layerManager = undefined;
    }, this)

    return this.layerManager;
}

export default CreateLayerManager;
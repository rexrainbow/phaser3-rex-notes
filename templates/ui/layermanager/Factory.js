import LayerManager from './LayerManager.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('layerManager', function (config) {
    return new LayerManager(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.LayerManager', LayerManager);

export default LayerManager;
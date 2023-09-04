import LayerManager from './LayerManager.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('layerManager', function (config) {
    var layermanager = new LayerManager(this.scene, config);
    // layermanager is not a gameObject
    return layermanager;
});

SetValue(window, 'RexPlugins.GameObjectShell.LayerManager', LayerManager);

export default LayerManager;
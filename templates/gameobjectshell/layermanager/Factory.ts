import LayerManager from './LayerManager';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('layerManager', function(config?: any) {
    var layermanager = new LayerManager(this.scene, config);
    // layermanager is not a gameObject
    return layermanager;
});

SetValue(window, 'RexPlugins.GameObjectShell.LayerManager', LayerManager);

export default LayerManager;
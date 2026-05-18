import LayerManager from './LayerManager';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('layerManager', function(config?: any) {
    return new LayerManager(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.LayerManager', LayerManager);

export default LayerManager;
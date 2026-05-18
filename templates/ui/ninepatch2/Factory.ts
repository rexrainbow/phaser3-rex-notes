import NinePatch from './NinePatch';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('ninePatch2', function(x?: any, y?: any, width?: any, height?: any, key?: any, columns?: any, rows?: any, config?: any) {
    var gameObject = new NinePatch(this.scene, x, y, width, height, key, columns, rows, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NinePatch2', NinePatch);

export default NinePatch;
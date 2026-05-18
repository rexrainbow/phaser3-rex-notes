import CanvasInput from './CanvasInput';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('canvasInput', function(x?: any, y?: any, fixedWidth?: any, fixedHeight?: any, config?: any) {
    var gameObject = new CanvasInput(this.scene, x, y, fixedWidth, fixedHeight, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CanvasInput', CanvasInput);

export default CanvasInput;
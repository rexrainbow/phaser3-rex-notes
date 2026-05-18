import FixWidthButtons from './FixWidthButtons';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fixWidthButtons', function(config?: any) {
    var gameObject = new FixWidthButtons(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FixWidthButtons', FixWidthButtons);

export default FixWidthButtons;
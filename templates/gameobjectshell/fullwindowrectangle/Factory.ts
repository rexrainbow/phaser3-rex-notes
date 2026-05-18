import FullWindowRectangle from './FullWindowRectangle';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fullWindowRectangle', function(fillColor?: any, fillAlpha?: any) {
    var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.FullWindowRectangle', FullWindowRectangle);

export default FullWindowRectangle;
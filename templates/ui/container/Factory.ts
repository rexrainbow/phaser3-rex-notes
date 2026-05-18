import Container from './Container';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('container', function(x?: any, y?: any, width?: any, height?: any, children?: any) {
    var gameObject = new Container(this.scene, x, y, width, height, children);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Container', Container);

export default Container;
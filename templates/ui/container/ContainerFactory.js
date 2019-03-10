import Container from './Container.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('container', function (x, y, width, height, children) {
    var container = new Container(this.scene, x, y, width, height, children);
    this.scene.sys.displayList.add(container);
    return container;
});

SetValue(window, 'RexPlugins.UI.Container', Container);

export default Container;
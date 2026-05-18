import ScrollBar from './ScrollBar';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('scrollBar', function(config?: any) {
    var gameObject = new ScrollBar(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ScrollBar', ScrollBar);

export default ScrollBar;
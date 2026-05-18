import LazyLoadImageBox from './LazyLoadImageBox';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('lazyLoadImageBox', function(config?: any) {
    var gameObject = new LazyLoadImageBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.LazyLoadImageBox', LazyLoadImageBox);

export default LazyLoadImageBox;
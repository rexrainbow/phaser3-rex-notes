import LazyLoadImageBox from './LazyLoadImageBox.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('lazyLoadImageBox', function (config) {
    var gameObject = new LazyLoadImageBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.LazyLoadImageBox', LazyLoadImageBox);

export default LazyLoadImageBox;
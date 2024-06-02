import Arrow from './Arrow.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('arrow', function (config) {
    var gameObject = new Arrow(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Arrow', Arrow);

export default Arrow;
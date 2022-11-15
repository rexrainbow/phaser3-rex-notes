import ColorInputLite from './ColorInputLite.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('colorInputLite', function (config) {
    var gameObject = new ColorInputLite(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorInputLite', ColorInputLite);

export default ColorInputLite;
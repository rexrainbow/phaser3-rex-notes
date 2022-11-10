import SingleLineInput from './SingleLineInput.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('singleLineInput', function (x, y, fixedWidth, fixedHeight, config) {
    var gameObject = new SingleLineInput(this.scene, x, y, fixedWidth, fixedHeight, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SingleLineInput', SingleLineInput);

export default SingleLineInput;
import Buttons from './Buttons.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('buttons', function (config) {
    return new Buttons(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Buttons', Buttons);

export default Buttons;
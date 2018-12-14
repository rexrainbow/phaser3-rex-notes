import NumberBar from './NumberBar.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('numberBar', function (config) {
    return new NumberBar(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.NumberBar', NumberBar);

export default NumberBar;
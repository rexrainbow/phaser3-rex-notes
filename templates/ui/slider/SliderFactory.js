import Slider from './Slider.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('slider', function (config) {
    return new Slider(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Slider', Slider);

export default Slider;
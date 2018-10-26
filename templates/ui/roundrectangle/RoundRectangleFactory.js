import RoundRectangle from './RoundRectangle.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('roundRectangle', function (x, y, width, height, radiusConfig, fillColor, fillAlpha) {
    return this.scene.sys.displayList.add(new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha));
});

SetValue(window, 'RexPlugins.UI.RoundRectangle', RoundRectangle);

export default RoundRectangle;
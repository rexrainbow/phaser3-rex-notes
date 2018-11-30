import RoundRectangle from './RoundRectangle.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('roundRectangle', function (x, y, width, height, radiusConfig, fillColor, fillAlpha) {
    var rect = new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha);
    this.scene.sys.displayList.add(rect);
    return rect;
});

SetValue(window, 'RexPlugins.UI.RoundRectangle', RoundRectangle);

export default RoundRectangle;
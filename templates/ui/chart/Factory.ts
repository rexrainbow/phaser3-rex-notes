import Chart from './Chart';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('chart', function(x?: any, y?: any, width?: any, height?: any, config?: any) {
    var gameObject = new Chart(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Chart', Chart);

export default Chart;
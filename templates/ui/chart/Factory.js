import Chart from './Chart.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('chart', function (x, y, width, height, config) {
    var gameObject = new Chart(this.scene, x, y, width, height, config);
    this.displayList.add(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Chart', Chart);

export default Chart;
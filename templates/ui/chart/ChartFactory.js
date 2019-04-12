import Chart from './Chart.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('chart', function (x, y, width, height, config) {
    var chart = new Chart(this.scene, x, y, width, height, config);
    this.scene.sys.displayList.add(chart);
    return chart;
});

SetValue(window, 'RexPlugins.UI.Chart', Chart);

export default Chart;
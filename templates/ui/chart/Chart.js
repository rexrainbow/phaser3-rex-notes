import Canvas from '../../../plugins/gameobjects/canvas/Canvas.js';
import SetChart from './SetChart.js';

// This plugin does not contain chart.js
// Load chart.js in preload stage -
// scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js');

class Chart extends Canvas {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y, width, height);
        this.type = 'rexChart';
        this.chart = undefined;

        if (config !== undefined) {
            this.setChart(config);
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
        super.destroy(fromScene);
    }

    resize(width, height) {
        super.resize(width, height);

        if (this.chart) {
            var chart = this.chart;
            chart.height = this.canvas.height;
            chart.width = this.canvas.width;
            chart.aspectRatio = (chart.height) ? chart.width / chart.height : null;
            chart.update();
        }
        return this;
    }
}

var methods = {
    setChart: SetChart,
}
Object.assign(
    Chart.prototype,
    methods
);

export default Chart;
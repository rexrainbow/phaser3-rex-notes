import Canvas from '../canvas/Canvas.js';
import methods from './methods/Methods.js';

// This plugin does not contain chart.js
// Load chart.js in preload stage -
// scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/Chart.min.js');


var IsChartJsV2 = function (chart) {
    return chart.resize.length === 1;
}

class Chart extends Canvas {
    constructor(scene, x, y, width, height, config) {
        if (config === undefined) {
            config = {};
        }
        var resolution = config.resolution;
        super(scene, x, y, width, height, resolution);
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
        if ((width === this.width) && (height === this.height)) {
            return this;
        }

        super.resize(width, height);

        if (this.chart) {
            var targetWidth = this.canvas.width;
            var targetHeight = this.canvas.height;
            var aspectRatio = (targetHeight) ? targetWidth / targetHeight : null;
            var chart = this.chart;

            chart.width = targetWidth;
            chart.height = targetHeight;
            if (IsChartJsV2(chart)) { // v2                
                chart.aspectRatio = aspectRatio;
            } else { // v3
                chart.options.aspectRatio = aspectRatio;
            }

            chart.update();
        }
        return this;
    }
}

Object.assign(
    Chart.prototype,
    methods
);

export default Chart;
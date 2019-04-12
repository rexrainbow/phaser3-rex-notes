import Canvas from '../../../plugins/gameobjects/canvas/Canvas.js';
import ChartCore from 'chart.js/dist/Chart.js';

class Chart extends Canvas {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y, width, height);
        this.type = 'rexChart';
        this.chart = new ChartCore(this.context, FillConfig(config, this));
    }

    resize(width, height) {
        super.resize(width, height);

        var me = this.chart;
        me.height = this.canvas.height;
        me.width = this.canvas.width;
        me.aspectRatio = (me.height) ? me.width / me.height : null;
        me.update();

        this.needRedraw();
        return this;
    }
}

var FillConfig = function (config, canvas) {
    // Get options
    if (config === undefined) {
        config = {};
    }
    if (config.options === undefined) {
        config.options = {};
    }
    var options = config.options;

    // Fill options
    options.responsive = false;
    options.maintainAspectRatio = false;
    if (!options.hasOwnProperty('devicePixelRatio')) {
        options.devicePixelRatio = 1;
    }

    // Get animation config
    var noAnimation = false;
    if ((options.animation === false) || (options.animation === undefined)) {
        noAnimation = true;
        options.animation = {};
    }
    var animationConfig = options.animation;

    // Fill animation config
    if (noAnimation) {
        animationConfig.duration = 0;
    }

    var onProgress = animationConfig.onProgress;
    animationConfig.onProgress = function (animation) {
        if (onProgress) {
            onProgress(animation);
        }
        canvas.needRedraw();
    }

    var onComplete = animationConfig.onComplete;
    animationConfig.onComplete = function (animation) {
        if (onComplete) {
            onComplete(animation);
        }
        canvas.needRedraw();
    }
    return config;
}

export default Chart;
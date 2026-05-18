var SetChart = function(config?: any) {
    if (!window.Chart) {
        var msg = `Can not find chartjs! Load chartjs in preload stage.
scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/Chart.min.js');`
        console.error(msg);
        return this;
    }

    if (this.chart) {
        this.chart.destroy();        
    }
    this.chart = new Chart(this.context, FillConfig(this, config));
    return this;
}

var FillConfig = function(canvas?: any, config?: any) {
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
    if (options.animation === undefined) {
        options.animation = {};
    } else if (options.animation === false) {
        noAnimation = true;
        options.animation = {};
    }
    var animationConfig = options.animation;

    // Fill animation config
    if (noAnimation?: any) {
        animationConfig.duration = 0;
    }

    var onProgress = animationConfig.onProgress;
    animationConfig.onProgress = function(animation?: any) {
        if (onProgress?: any) {
            onProgress(animation);
        }
        canvas.needRedraw();
    }

    var onComplete = animationConfig.onComplete;
    animationConfig.onComplete = function(animation?: any) {
        if (onComplete?: any) {
            onComplete(animation);
        }
        canvas.needRedraw();
    }
    return config;
}

export default SetChart;
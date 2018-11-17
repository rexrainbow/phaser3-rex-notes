import Fade from 'rexPlugins/fade.js';
export default function (duration) {
    defaultConfig.mode = 0;
    defaultConfig.start = 0;
    defaultConfig.end = 1;
    defaultConfig.duration = duration;
    var fade = new Fade(this, defaultConfig);
    fade.start();
    return this;
}
var defaultConfig = {}; // reuse this config
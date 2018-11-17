import FadeOutDestroy from 'rexPlugins/fade-out-destroy.js';
export default function (duration) {
    FadeOutDestroy(this, duration);
    return this;
};
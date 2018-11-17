import ScaleDownDestroy from 'rexPlugins/scale-down-destroy.js';
export default function (duration, orientation, ease) {
    ScaleDownDestroy(this, duration, orientation, ease);
    return this;
}
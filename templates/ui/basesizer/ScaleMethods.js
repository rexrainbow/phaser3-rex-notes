import { ScaleMethods } from '../scale/Scale.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';

var methods = {};
Object.assign(methods, ScaleMethods);

methods.onInitScale = function () {
    ScaleMethods.onInitScale.call(this);

    var gameObject = this;
    var scale = this._scaleBehavior;
    // Update local state
    scale.on('update', function () {
        var parent = GetParentSizerMethods.getParentSizer(gameObject)
        if (parent) {
            parent.resetChildPositionState(gameObject);
        }
    })
}

export default methods;
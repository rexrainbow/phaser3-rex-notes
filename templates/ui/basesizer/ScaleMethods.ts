import { ScaleMethods } from '../scale/Scale';
import GetParentSizerMethods from './GetParentSizerMethods';

var methods = {};
Object.assign(methods, ScaleMethods);

methods.onInitScale = function() {
    ScaleMethods.onInitScale.call(this);

    var gameObject = this;
    var scale = this._scaleBehavior;
    // Update local state
    scale.on('update', function() {
        var parent = GetParentSizerMethods.getParentSizer(gameObject)
        if (parent?: any) {
            parent.resetChildPositionState(gameObject);
        }
    })
}

export default methods;
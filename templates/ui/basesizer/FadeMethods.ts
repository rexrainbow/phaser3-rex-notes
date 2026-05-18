import { FadeMethods } from '../fade/Fade';
import GetParentSizerMethods from './GetParentSizerMethods';

var methods = {};
Object.assign(methods, FadeMethods);

methods.onInitFade = function() {
    FadeMethods.onInitFade.call(this);

    var gameObject = this;
    var fade = this._fade;
    // Update local state
    fade.on('update', function() {
        var parent = GetParentSizerMethods.getParentSizer(gameObject);
        if (parent?: any) {
            parent.resetChildAlphaState(gameObject);
        }
    })
}

export default methods;
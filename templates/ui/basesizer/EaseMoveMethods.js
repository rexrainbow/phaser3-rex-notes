import { EaseMoveMethods } from '../easemove/EaseMove.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';

var methods = {};
Object.assign(methods, EaseMoveMethods);

methods.onInitEaseMove = function () {
    EaseMoveMethods.onInitEaseMove.call(this);

    var gameObject = this;
    var easeMove = this._easeMove;
    easeMove.on('update', function () {
        var parent = GetParentSizerMethods.getParentSizer(gameObject);
        if (parent) {
            parent.resetChildPositionState(gameObject);
        }
    })
}

export default methods;
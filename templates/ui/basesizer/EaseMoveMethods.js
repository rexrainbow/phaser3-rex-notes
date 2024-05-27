import EaseMoveMethods from '../../../plugins/behaviors/easemove/EaseMoveMethods.js';
import GetParentSizerMethods from './GetParentSizerMethods.js';

var method = {}

Object.assign(
    method,
    EaseMoveMethods
)

method.onInitEaseMove = function () {
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

export default method;
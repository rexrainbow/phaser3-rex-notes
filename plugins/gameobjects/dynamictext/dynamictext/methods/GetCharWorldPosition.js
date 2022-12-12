import GetBobWorldPosition from './utils/transform/GetBobWorldPosition.js';

var GetCharWorldPosition = function (child, offsetX, offsetY, out) {
    if (typeof (child) === 'number') {
        child = this.getCharChild(child, true);
    }

    return GetBobWorldPosition.call(this, child, offsetX, offsetY, out);
}

export default GetCharWorldPosition;
import GetBobWorldPosition from './utils/transform/GetBobWorldPosition';

var GetCharWorldPosition = function(child?: any, offsetX?: any, offsetY?: any, out?: any) {
    if (typeof (child) === 'number') {
        child = this.getCharChild(child, true);
    }

    return GetBobWorldPosition(this, child, offsetX, offsetY, out);
}

export default GetCharWorldPosition;
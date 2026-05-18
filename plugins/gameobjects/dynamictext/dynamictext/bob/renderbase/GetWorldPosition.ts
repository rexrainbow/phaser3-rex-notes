import GetBobWorldPosition from '../../methods/utils/transform/GetBobWorldPosition';

var GetWorldPosition = function(offsetX?: any, offsetY?: any, out?: any) {
    return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
}

export default GetWorldPosition;
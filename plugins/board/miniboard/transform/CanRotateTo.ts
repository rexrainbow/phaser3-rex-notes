var CanRotateTo = function(direction?: any) {
    direction -= this.face;
    return this.canRotate(direction);
}
export default CanRotateTo;
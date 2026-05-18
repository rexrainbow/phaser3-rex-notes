var RotateTo = function(direction?: any) {
    direction -= this.face;
    this.rotate(direction);
    return this;
}
export default RotateTo;
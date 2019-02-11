var GetChildWidth = function (child) {
    var padding = child.rexSizer.padding;
    return child.width + padding.left + padding.right;
}
export default GetChildWidth;
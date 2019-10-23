var GetChildWidth = function (child) {
    var padding = child.rexSizer.padding;
    return child.displayWidth + padding.left + padding.right;
}
export default GetChildWidth;
var GetChildHeight = function (child) {
    var padding = child.rexSizer.padding;
    return child.height + padding.top + padding.bottom;
}
export default GetChildHeight;
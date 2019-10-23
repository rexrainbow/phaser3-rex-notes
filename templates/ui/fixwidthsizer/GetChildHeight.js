var GetChildHeight = function (child) {
    var padding = child.rexSizer.padding;
    return child.displayHeight + padding.top + padding.bottom;
}
export default GetChildHeight;
// Override
var Layout = function (parent, newWidth, newHeight) {
    if (this.rexSizer.hidden) {
        return this;
    }

    this.preLayout()

    // ...

    return this.postLayout();
}
export default Layout;
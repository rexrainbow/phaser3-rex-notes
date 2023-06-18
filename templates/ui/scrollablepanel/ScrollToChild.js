var ScrollToChild = function (child) {
    if (!this.hasChild(child)) {
        return this;
    }

    if (this.scrollMode === 0) {
        this.childOY += this.top - child.getTopLeft().y;
    } else {
        this.childOY += this.left - child.getTopLeft().x;
    }

    return this;
}

export default ScrollToChild;
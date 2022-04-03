var DrawContent = function () {
    this.clear();

    var width = (this.fixedWidth > 0) ? this.fixedWidth : this.width;
    var height = (this.fixedHeight > 0) ? this.fixedHeight : this.height;
    this.setSize(width, height);

    if (this.background.active) {
        this.background.draw();
    }

    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        child = this.children[i];
        if (child.active && child.visible) {
            child.draw();
        }
    }

    if (this.innerBounds.active) {
        this.innerBounds.draw();
    }
}

export default DrawContent;
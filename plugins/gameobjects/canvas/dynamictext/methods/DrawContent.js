var DrawContent = function () {

    if (this.background.active) {
        this.background.draw();
    }

    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        child = this.children[i];
        if (child.active) {
            child.draw();
        }
    }

    if (this.innerBounds.active) {
        this.innerBounds.draw();
    }
}

export default DrawContent;
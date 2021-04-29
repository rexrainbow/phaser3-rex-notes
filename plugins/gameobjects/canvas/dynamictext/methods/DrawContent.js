var DrawContent = function () {

    if (this.background.valid) {
        this.background.draw();
    }

    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        child = this.children[i];
        if (child.valid) {
            child.draw();
        }
    }

    if (this.innerBounds.valid) {
        this.innerBounds.draw();
    }
}

export default DrawContent;
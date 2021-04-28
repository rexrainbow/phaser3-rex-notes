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

    // Debug
    var context = this.context;
    context.beginPath();
    context.rect(
        this.padding.left,
        this.padding.top,
        this.width - this.padding.left - this.padding.right,
        this.height - this.padding.top - this.padding.bottom);
    context.strokeStyle = 'red';
    context.stroke();
}

export default DrawContent;
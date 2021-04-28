var DrawContent = function () {

    this.background.draw();

    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        this.children[i].draw();
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
var DrawContent = function () {

    this.background.draw();

    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        this.children[i].draw();
    }
}

export default DrawContent;
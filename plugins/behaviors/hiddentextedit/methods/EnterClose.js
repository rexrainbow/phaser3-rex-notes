var EnterClose = function () {
    this.close();
    this.emit('keydown-ENTER', this.parent, this);
    return this;
}

export default EnterClose;
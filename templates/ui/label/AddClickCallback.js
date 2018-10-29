var AddClickCallback = function (callback, scope) {
    this.setInteractive();
    this.on('pointerdown', callback, scope);
    return this;
}
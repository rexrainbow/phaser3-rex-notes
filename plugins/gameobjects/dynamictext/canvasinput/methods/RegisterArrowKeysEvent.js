var RegisterArrowKeysEvent = function () {
    var keyEventManager = this.scene.input.keyboard;
    this.textEdit
        .on('open', function () {
            keyEventManager
                .on('keydown-UP', this.cursorMoveUp, this)
                .on('keydown-DOWN', this.cursorMoveDown, this)
        }, this)
        .on('close', function () {
            keyEventManager
                .off('keydown-UP', this.cursorMoveUp, this)
                .off('keydown-DOWN', this.cursorMoveDown, this)
        }, this)

}

export default RegisterArrowKeysEvent;
import RemoveElement from './RemoveElement.js';
import EnterClose from './EnterClose.js';

var OnClose = function () {

    this.isOpened = false;

    this.updateText();

    if (this.enterCloseEnable) {
        this.scene.input.keyboard.off('keydown-ENTER', EnterClose, this);
    }

    this.scene.sys.events.off('postupdate', this.updateText, this);

    if (this.clickOutSideTarget) {
        this.clickOutSideTarget
            .disableInteractive()
            .off('pointerdown', this.onClickOutside, this);

    } else {
        this.scene.input.off('pointerdown', this.onClickOutside, this);

    }

    if (this.onCloseCallback) {
        this.onCloseCallback(this.parent, this);
    }

    // Remove input text element when closing editor
    RemoveElement(this.node);
    this.node = undefined;

    this.emit('close', this);

}

export default OnClose;
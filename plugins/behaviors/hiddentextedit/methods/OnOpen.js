import EnterClose from './EnterClose.js';
import { MoveMyDepthAbove, MoveMyDepthBelow } from '../../../utils/gameobject/displaylist/DisplayListMethods.js'

var OnOpen = function () {
    this.isOpened = true;

    this.initText();

    if (this.enterCloseEnable) {
        this.scene.input.keyboard.once('keydown-ENTER', EnterClose, this);
    }

    // There is no cursor-position-change event, 
    // so updating cursor position every tick
    this.scene.sys.events.on('postupdate', this.updateText, this);

    if (this.clickOutSideTarget) {
        MoveMyDepthAbove.call(this.clickOutSideTarget, this.parent);
        MoveMyDepthBelow.call(this.clickOutSideTarget, this.parent);

        this.clickOutSideTarget
            .setInteractive()
            .on('pointerdown', this.onClickOutside, this);

    } else {
        this.scene.input.on('pointerdown', this.onClickOutside, this);
    }

    if (this.onOpenCallback) {
        this.onOpenCallback(this.parent, this);
    }

    this.emit('open', this);
}

export default OnOpen;
import {
    ButtonSetInteractive,
    FireEvent
} from './ButtonSetInteractive.js';
import {
    Show,
    Hide,
    IsShown,
} from '../utils/Hide.js';

export default {
    getButton(index) {
        var button;
        if (typeof (index) === 'number') {
            button = this.childrenMap.buttons[index];
        } else {
            button = index;
            if (this.childrenMap.buttons.indexOf(button) === -1) {
                button = undefined;
            }
        }
        return button;
    },

    emitButtonClick(index) {
        // index or button game object
        FireEvent.call(this, 'button.click', index);
        return this;
    },

    showButton(index) {
        Show(this.getButton(index));
        return this;
    },

    hideButton(index) {
        Hide(this.getButton(index));
        return this;
    },

    isButtonShown(index) {
        IsShown(this.getButton(index));
        return this;
    },

    forEachButtton(callback, scope) {
        var buttons = this.childrenMap.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            if (scope) {
                callback.call(scope, buttons[i], i, buttons);
            } else {
                callback(buttons[i], i, buttons);
            }
        }
        return this;
    }
}
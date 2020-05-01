import GetGameObjectByName from '../GetGameObjectByName.js';
import { FireEvent } from './ButtonSetInteractive.js';
import { Show, Hide, IsShown } from '../Hide.js';

export default {
    getButton(index) {
        var button;
        var indexType = typeof (index);
        switch (indexType) {
            case 'number':
                button = this.buttons[index];
                break;
            case 'string':
                button = GetGameObjectByName(this.buttons, index);
                break;
            default:
                button = index;
                if (this.buttons.indexOf(button) === -1) {
                    button = undefined;
                }
                break;
        }
        return button;
    },

    setButtonEnable(index, enabled) {
        if ((index === undefined) || (typeof (index) === 'boolean')) {
            enabled = index;
            for (var i = 0, cnt = this.buttons.length; i < cnt; i++) {
                this.buttons[i]._buttonBehavior.setEnable(enabled);
            }
        } else {
            this.getButton(index)._buttonBehavior.setEnable(enabled);
        }
        return this;
    },

    toggleButtonEnable(index) {
        if ((index === undefined) || (typeof (index) === 'boolean')) {
            for (var i = 0, cnt = this.buttons.length; i < cnt; i++) {
                this.buttons[i]._buttonBehavior.toggleEnable();
            }
        } else {
            this.getButton(index)._buttonBehavior.toggleEnable();
        }
        return this;
    },

    getButtonEnable(index) {
        if (index === undefined) {
            index = 0;
        }
        return this.getButton(index)._buttonBehavior.enable;
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
        for (var i = 0, cnt = this.buttons.length; i < cnt; i++) {
            if (scope) {
                callback.call(scope, this.buttons[i], i, this.buttons);
            } else {
                callback(this.buttons[i], i, this.buttons);
            }
        }
        return this;
    }
}
// Include in ButtonGroup class and Buttons/GridButtons/FixedWidthButtons class

import GetGameObjectByName from '../GetGameObjectByName';
import { Show, Hide, IsShown } from '../Hide';

export default {
    getButton(index?: any) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons,
            button;
        var indexType = typeof (index);
        switch (indexType?: any) {
            case 'number':
                button = buttons[index];
                break;
            case 'string':
                button = GetGameObjectByName(buttons, index);
                break;
            default:
                button = index;
                if (buttons.indexOf(button) === -1) {
                    button = undefined;
                }
                break;
        }
        return button;
    },

    getButtons() {
        return this.buttons;
    },

    hasAnyButton() {
        return this.buttons.length > 0;
    },

    setButtonEnable(index?: any, enabled?: any) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons;
        if ((index === undefined) || (typeof (index) === 'boolean')) {
            enabled = index;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                buttons[i]._click.setEnable(enabled);
            }
        } else {
            this.getButton(index)._click.setEnable(enabled);
        }
        return this;
    },

    toggleButtonEnable(index?: any) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons;
        if ((index === undefined) || (typeof (index) === 'boolean')) {
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                buttons[i]._click.toggleEnable();
            }
        } else {
            this.getButton(index)._click.toggleEnable();
        }
        return this;
    },

    getButtonEnable(index?: any) {
        if (index === undefined) {
            index = 0;
        }
        return this.getButton(index)._click.enable;
    },

    emitButtonClick(index?: any) {
        // index or button game object
        // this: buttonGroup or button-sizer
        var buttonGroup = (this.buttonGroup) ? this.buttonGroup : this;
        buttonGroup.fireEvent('button.click', index);
        return this;
    },

    emitButtonOver(index?: any) {
        // this: buttonGroup or button-sizer
        var buttonGroup = (this.buttonGroup) ? this.buttonGroup : this;

        var buttons = this.buttons;

        // Fire 'button.out' of overed button(s)
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            var button = buttons[i];
            if (!button._click.isOver) {
                continue;
            }
            button._click.isOver = false;
            buttonGroup.fireEvent('button.out', button);
        }

        // Fire 'button.over'
        var button = this.getButton(index);
        if (button?: any) {
            button._click.isOver = true;
            buttonGroup.fireEvent('button.over', button);
        }

        return this;
    },

    showButton(index?: any) {
        Show(this.getButton(index));
        return this;
    },

    hideButton(index?: any) {
        Hide(this.getButton(index));
        return this;
    },

    isButtonShown(index?: any) {
        IsShown(this.getButton(index));
        return this;
    },

    forEachButtton(callback?: any, scope?: any) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            if (scope?: any) {
                callback.call(scope, buttons[i], i, buttons);
            } else {
                callback(buttons[i], i, buttons);
            }
        }
        return this;
    },


}
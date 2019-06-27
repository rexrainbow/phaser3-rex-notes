import {
    Show,
    Hide
} from '../utils/Hide.js';

export default {
    emitButtonClick(groupName, index) {
        var buttonsSizer = this.childrenMap[groupName + 'ButtonsSizer'];
        if (!buttonsSizer) {
            return this;
        }
        buttonsSizer.emitButtonClick(index);
        return this;
    },

    emitLeftButtonClick(index) {
        this.childrenMap.leftButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitRightButtonClick(index) {
        this.childrenMap.rightButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitTopButtonClick(index) {
        this.childrenMap.topButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitBottomButtonClick(index) {
        this.childrenMap.bottomButtonsSizer.emitButtonClick(index);
        return this;
    },

    getButton(groupName, index) {
        var buttons = this.childrenMap[groupName + 'Buttons'];
        if (!buttons) {
            return undefined;
        }
        return buttons[index];
    },

    getLeftButton(index) {
        return this.childrenMap.leftButtons[index];
    },

    getRightButton(index) {
        return this.childrenMap.rightButtons[index];
    },

    getTopButton(index) {
        return this.childrenMap.topButtons[index];
    },

    getBottomButton(index) {
        return this.childrenMap.bottomButtons[index];
    },

    showButton(groupName, index) {
        var button = this.getButton(groupName, index);
        if (button) {
            Show(button);
        }
        return this;
    },

    showLeftButton(index) {
        Show(this.getLeftButton(index));
        return this;
    },

    showRightButton(index) {
        Show(this.getRightButton(index));
        return this;
    },

    showTopButton(index) {
        Show(this.getTopButton(index));
        return this;
    },

    showBottomButton(index) {
        Show(this.getBottomButton(index));
        return this;
    },

    hideButton(groupName, index) {
        var button = this.getButton(groupName, index);
        if (button) {
            Hide(button);
        }
        return this;
    },

    hideLeftButton(index) {
        Hide(this.getLeftButton(index));
        return this;
    },

    hideRightButton(index) {
        Hide(this.getRightButton(index));
        return this;
    },

    hideTopButton(index) {
        Hide(this.getTopButton(index));
        return this;
    },

    hideBottomButton(index) {
        Hide(this.getBottomButton(index));
        return this;
    },
};
import {
    Show,
    Hide
} from '../utils/Hide.js';

export default {
    getButtonsSizer(groupName) {
        return this.childrenMap[groupName + 'ButtonsSizer'];
    },

    getButton(groupName, index) {
        var buttonsSizer = this.getButtonsSizer(groupName);
        return (buttonsSizer) ? buttonsSizer.getButton(index) : undefined;
    },

    emitButtonClick(groupName, index) {
        var buttonsSizer = this.getButtonsSizer(groupName);
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

    getLeftButton(index) {
        return this.childrenMap.leftButtonsSizer.getButton(index);
    },

    getRightButton(index) {
        return this.childrenMap.rightButtonsSizer.getButton(index);
    },

    getTopButton(index) {
        return this.childrenMap.topButtonsSizer.getButton(index);
    },

    getBottomButton(index) {
        return this.childrenMap.bottomButtonsSizer.getButton(index);
    },

    showButton(groupName, index) {
        Show(this.getButton(groupName, index));
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
        Hide(this.getButton(groupName, index));
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

    forEachLeftButton(callback, scope) {
        this.childrenMap.leftButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachRightButton(callback, scope) {
        this.childrenMap.rightButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachTopButton(callback, scope) {
        this.childrenMap.topButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachBottomButton(callback, scope) {
        this.childrenMap.bottomButtonsSizer.forEachButtton(callback, scope);
        return this;
    },
};
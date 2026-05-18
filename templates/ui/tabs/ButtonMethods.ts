import {
    Show,
    Hide
} from '../utils/Hide';

export default {
    getButtonsSizer(groupName?: any) {
        return this.childrenMap[`${groupName}ButtonsSizer`];
    },

    getButton(groupName?: any, index?: any) {
        var buttonsSizer = this.getButtonsSizer(groupName);
        return (buttonsSizer) ? buttonsSizer.getButton(index) : undefined;
    },

    setButtonEnable(groupName?: any, index?: any, enabled?: any) {
        this.getButtonsSizer(groupName).setButtonEnable(index, enabled);
        return this;
    },

    setLeftButtonEnable(index?: any, enabled?: any) {
        this.childrenMap.leftButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setRightButtonEnable(index?: any, enabled?: any) {
        this.childrenMap.rightButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setTopButtonEnable(index?: any, enabled?: any) {
        this.childrenMap.topButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setBottomButtonEnable(index?: any, enabled?: any) {
        this.childrenMap.bottomButtonsSizer.setButtonEnable(index, enabled);
        return this;
    },

    toggleButtonEnable(groupName?: any, index?: any) {
        this.getButtonsSizer(groupName).toggleButtonEnable(index);
        return this;
    },

    toggleLeftButtonEnable(index?: any) {
        this.childrenMap.leftButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleRightButtonEnable(index?: any) {
        this.childrenMap.rightButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleTopButtonEnable(index?: any) {
        this.childrenMap.topButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleBottomButtonEnable(index?: any) {
        this.childrenMap.bottomButtonsSizer.toggleButtonEnable(index);
        return this;
    },

    getButtonEnable(groupName?: any, index?: any) {
        return this.getButtonsSizer(groupName).getButtonEnable(index);
    },

    getLeftButtonEnable(index?: any) {
        return this.childrenMap.leftButtonsSizer.getButtonEnable(index);
    },

    getRightButtonEnable(index?: any) {
        return this.childrenMap.rightButtonsSizer.getButtonEnable(index);
    },

    getTopButtonEnable(index?: any) {
        return this.childrenMap.topButtonsSizer.getButtonEnable(index);
    },

    getBottomButtonEnable(index?: any) {
        return this.childrenMap.bottomButtonsSizer.getButtonEnable(index);
    },

    emitButtonClick(groupName?: any, index?: any) {
        var buttonsSizer = this.getButtonsSizer(groupName);
        if (!buttonsSizer) {
            return this;
        }
        buttonsSizer.emitButtonClick(index);
        return this;
    },

    emitLeftButtonClick(index?: any) {
        this.childrenMap.leftButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitRightButtonClick(index?: any) {
        this.childrenMap.rightButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitTopButtonClick(index?: any) {
        this.childrenMap.topButtonsSizer.emitButtonClick(index);
        return this;
    },

    emitBottomButtonClick(index?: any) {
        this.childrenMap.bottomButtonsSizer.emitButtonClick(index);
        return this;
    },

    getLeftButton(index?: any) {
        return this.childrenMap.leftButtonsSizer.getButton(index);
    },

    getRightButton(index?: any) {
        return this.childrenMap.rightButtonsSizer.getButton(index);
    },

    getTopButton(index?: any) {
        return this.childrenMap.topButtonsSizer.getButton(index);
    },

    getBottomButton(index?: any) {
        return this.childrenMap.bottomButtonsSizer.getButton(index);
    },

    showButton(groupName?: any, index?: any) {
        Show(this.getButton(groupName, index));
        return this;
    },

    showLeftButton(index?: any) {
        Show(this.getLeftButton(index));
        return this;
    },

    showRightButton(index?: any) {
        Show(this.getRightButton(index));
        return this;
    },

    showTopButton(index?: any) {
        Show(this.getTopButton(index));
        return this;
    },

    showBottomButton(index?: any) {
        Show(this.getBottomButton(index));
        return this;
    },

    hideButton(groupName?: any, index?: any) {
        Hide(this.getButton(groupName, index));
        return this;
    },

    hideLeftButton(index?: any) {
        Hide(this.getLeftButton(index));
        return this;
    },

    hideRightButton(index?: any) {
        Hide(this.getRightButton(index));
        return this;
    },

    hideTopButton(index?: any) {
        Hide(this.getTopButton(index));
        return this;
    },

    hideBottomButton(index?: any) {
        Hide(this.getBottomButton(index));
        return this;
    },

    addButton(groupName?: any, gameObject?: any) {
        this.getButtonsSizer(groupName).addButton(gameObject);
        return this;
    },

    addLeftButton(gameObject?: any) {
        this.addButton('left', gameObject);
        return this;
    },

    addRightButton(gameObject?: any) {
        this.addButton('right', gameObject);
        return this;
    },

    addTopButton(gameObject?: any) {
        this.addButton('top', gameObject);
        return this;
    },

    removeButton(groupName?: any, index?: any, destroyChild?: any) {
        this.getButtonsSizer(groupName).removeButton(index, destroyChild);
        return this;
    },

    removeLeftButton(index?: any, destroyChild?: any) {
        this.removeButton('left', index, destroyChild);
        return this;
    },

    removeRightButton(index?: any, destroyChild?: any) {
        this.removeButton('right', index, destroyChild);
        return this;
    },

    removeTopButton(index?: any, destroyChild?: any) {
        this.removeButton('top', index, destroyChild);
        return this;
    },

    removeBottomButton(index?: any, destroyChild?: any) {
        this.removeButton('bottom', index, destroyChild);
        return this;
    },

    clearButtons(groupName?: any, destroyChild?: any) {
        this.getButtonsSizer(groupName).clearButtons(destroyChild);
        return this;
    },

    clearLeftButtons(destroyChild?: any) {
        this.clearButtons('left', destroyChild);
        return this;
    },

    clearRightButtons(destroyChild?: any) {
        this.clearButtons('right', destroyChild);
        return this;
    },

    clearTopButtons(destroyChild?: any) {
        this.clearButtons('top', destroyChild);
        return this;
    },

    clearBottomButtonss(destroyChild?: any) {
        this.clearButtons('bottom', destroyChild);
        return this;
    },

    forEachButton(groupName?: any, callback?: any, scope?: any) {
        this.getButtonsSizer(groupName).forEachButtton(callback, scope);
        return this;
    },

    forEachLeftButton(callback?: any, scope?: any) {
        this.childrenMap.leftButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachRightButton(callback?: any, scope?: any) {
        this.childrenMap.rightButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachTopButton(callback?: any, scope?: any) {
        this.childrenMap.topButtonsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachBottomButton(callback?: any, scope?: any) {
        this.childrenMap.bottomButtonsSizer.forEachButtton(callback, scope);
        return this;
    },
};
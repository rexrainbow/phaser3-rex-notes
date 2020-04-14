export default {
    getChoice(index) {
        return this.childrenMap.choicesSizer.getButton(index);
    },

    getAction(index) {
        return this.childrenMap.actionsSizer.getButton(index);
    },

    getToolbar(index) {
        return this.childrenMap.toolbarSizer.getButton(index);
    },

    getLeftToolbar(index) {
        return this.childrenMap.leftToolbarSizer.getButton(index);
    },

    setChoiceEnable(index, enabled) {
        this.childrenMap.choicesSizer.setButtonEnable(index, enabled);
        return this;
    },

    setActionEnable(index, enabled) {
        this.childrenMap.actionsSizer.setButtonEnable(index, enabled);
        return this;
    },

    setToolbarEnable(index, enabled) {
        this.childrenMap.toolbarSizer.setButtonEnable(index, enabled);
        return this;
    },

    setLeftToolbarEnable(index, enabled) {
        this.childrenMap.leftToolbarSizer.setButtonEnable(index, enabled);
        return this;
    },

    toggleChoiceEnable(index) {
        this.childrenMap.choicesSizer.toggleButtonEnable(index);
        return this;
    },

    toggleActionEnable(index) {
        this.childrenMap.actionsSizer.toggleButtonEnable(index);
        return this;
    },

    toggleToolbarEnable(index) {
        this.childrenMap.toolbarSizer.toggleButtonEnable(index);
        return this;
    },

    toggleLeftToolbarEnable(index) {
        this.childrenMap.leftToolbarSizer.toggleButtonEnable(index);
        return this;
    },

    getChoiceEnable(index) {
        return this.childrenMap.choicesSizer.getButtonEnable(index);
    },

    getActionEnable(index) {
        return this.childrenMap.actionsSizer.getButtonEnable(index);
    },

    getToolbarEnable(index) {
        return this.childrenMap.toolbarSizer.getButtonEnable(index);
    },

    getLeftToolbarEnable(index) {
        return this.childrenMap.leftToolbarSizer.getButtonEnable(index);
    },

    emitChoiceClick(index) {
        this.childrenMap.choicesSizer.emitButtonClick(index);
        return this;
    },

    emitActionClick(index) {
        this.childrenMap.actionsSizer.emitButtonClick(index);
        return this;
    },

    emitToolbarClick(index) {
        this.childrenMap.toolbarSizer.emitButtonClick(index);
        return this;
    },

    emitLeftToolbarClick(index) {
        this.childrenMap.leftToolbarSizer.emitButtonClick(index);
        return this;
    },

    showChoice(index) {
        this.childrenMap.choicesSizer.showButton(index);
        return this;
    },

    showAction(index) {
        this.childrenMap.actionsSizer.showButton(index);
        return this;
    },

    showToolbar(index) {
        this.childrenMap.toolbarSizer.showButton(index);
        return this;
    },

    showLeftToolbar(index) {
        this.childrenMap.leftToolbarSizer.showButton(index);
        return this;
    },

    hideChoice(index) {
        this.childrenMap.choicesSizer.hideButton(index);
        return this;
    },

    hideAction(index) {
        this.childrenMap.actionsSizer.hideButton(index);
        return this;
    },

    hideToolbar(index) {
        this.childrenMap.toolbarSizer.hideButton(index);
        return this;
    },

    hideLeftToolbar(index) {
        this.childrenMap.leftToolbarSizer.hideButton(index);
        return this;
    },

    addChoice(gameObject) {
        this.childrenMap.choicesSizer.addButton(gameObject);
        return this;
    },

    addAction(gameObject) {
        this.childrenMap.actionsSizer.addButton(gameObject);
        return this;
    },

    addToolbar(gameObject) {
        this.childrenMap.toolbarSizer.addButton(gameObject);
        return this;
    },

    addLeftToolbar(gameObject) {
        this.childrenMap.leftToolbarSizer.addButton(gameObject);
        return this;
    },

    removeChoice(index, destroyChild) {
        this.childrenMap.choicesSizer.removeButton(index, destroyChild);
        return this;
    },

    removeAction(index, destroyChild) {
        this.childrenMap.actionsSizer.removeButton(index, destroyChild);
        return this;
    },

    removeToolbar(index, destroyChild) {
        this.childrenMap.toolbarSizer.removeButton(index, destroyChild);
        return this;
    },

    removeLeftToolbar(index, destroyChild) {
        this.childrenMap.leftToolbarSizer.removeButton(index, destroyChild);
        return this;
    },

    clearChoices(destroyChild) {
        this.childrenMap.choicesSizer.clearButtons(destroyChild);
        return this;
    },

    clearActions(destroyChild) {
        this.childrenMap.actionsSizer.clearButtons(destroyChild);
        return this;
    },

    clearToolbar(destroyChild) {
        this.childrenMap.toolbarSizer.clearButtons(destroyChild);
        return this;
    },

    clearLeftToolbar(destroyChild) {
        this.childrenMap.leftToolbarSizer.clearButtons(destroyChild);
        return this;
    },

    forEachChoice(callback, scope) {
        this.childrenMap.choicesSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachAction(callback, scope) {
        this.childrenMap.actionsSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachToolbar(callback, scope) {
        this.childrenMap.toolbarSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachLeftToolbar(callback, scope) {
        this.childrenMap.leftToolbarSizer.forEachButtton(callback, scope);
        return this;
    }
};
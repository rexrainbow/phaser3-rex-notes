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
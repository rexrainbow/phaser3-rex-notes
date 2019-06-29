export default {
    getChoice(index) {
        return this.childrenMap.choicesSizer.getButton(index);
    },

    getAction(index) {
        return this.childrenMap.actionsSizer.getButton(index);
    },

    emitChoiceClick(index) {
        this.childrenMap.choicesSizer.emitButtonClick(index);
        return this;
    },

    emitActionClick(index) {
        this.childrenMap.actionsSizer.emitButtonClick(index);
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

    hideChoice(index) {
        this.childrenMap.choicesSizer.hideButton(index);
        return this;
    },

    hideAction(index) {
        this.childrenMap.actionsSizer.hideButton(index);
        return this;
    },

    forEachChoice(callback, scope) {
        this.childrenMap.choicesSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachChoice(callback, scope) {
        this.childrenMap.choicesSizer.forEachButtton(callback, scope);
        return this;
    },

    forEachAction(callback, scope) {
        this.childrenMap.actionsSizer.forEachButtton(callback, scope);
        return this;
    }
};
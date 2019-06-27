import {
    Show,
    Hide
} from '../utils/Hide.js';

export default {
    emitChoiceClick(index) {
        this.childrenMap.choicesSizer.emitButtonClick(index);
        return this;
    },

    emitActionClick(index) {
        this.childrenMap.actionsSizer.emitButtonClick(index);
        return this;
    },

    getChoiceButton(index) {
        return this.childrenMap.choices[index];
    },

    getActionButton(index) {
        return this.childrenMap.actions[index];
    },

    showChoiceButton(index) {
        Show(this.getChoiceButton(index));
        return this;
    },

    showActionButton(index) {
        Show(this.getActionButton(index));
        return this;
    },

    hideChoiceButton(index) {
        Hide(this.getChoiceButton(index));
        return this;
    },

    hideActionButton(index) {
        Hide(this.getActionButton(index));
        return this;
    },
};
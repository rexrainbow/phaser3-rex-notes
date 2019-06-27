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

    getChoice(index) {
        return this.childrenMap.choices[index];
    },

    getAction(index) {
        return this.childrenMap.actions[index];
    },

    showChoice(index) {
        Show(this.getChoice(index));
        return this;
    },

    showAction(index) {
        Show(this.getAction(index));
        return this;
    },

    hideChoice(index) {
        Hide(this.getChoice(index));
        return this;
    },

    hideAction(index) {
        Hide(this.getAction(index));
        return this;
    },
};
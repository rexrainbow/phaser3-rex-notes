import { TREE_STATE, IDLE } from '../constants.js';

export default {

    getTreeMemory(blackboard) {
        return blackboard.getTreeMemory(this.id);
    },

    getData(blackboard, key) {
        return blackboard.get(key, this.id);
    },

    setData(blackboard, key, value) {
        blackboard.set(key, value, this.id);
        return this;
    },

    getState(blackboard) {
        return this.getData(blackboard, TREE_STATE);
    },

    resetState(blackboard) {
        this.setData(blackboard, TREE_STATE, IDLE);
        return this;
    },

}
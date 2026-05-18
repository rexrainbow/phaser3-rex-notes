import { TREE_STATE, IDLE } from '../constants';

export default {

    getTreeMemory(blackboard?: any) {
        return blackboard.getTreeMemory(this.id);
    },

    getData(blackboard?: any, key?: any) {
        return blackboard.get(key, this.id);
    },

    setData(blackboard?: any, key?: any, value?: any) {
        blackboard.set(key, value, this.id);
        return this;
    },

    getState(blackboard?: any) {
        return this.getData(blackboard, TREE_STATE);
    },

    resetState(blackboard?: any) {
        this.setData(blackboard, TREE_STATE, IDLE);
        return this;
    },

}
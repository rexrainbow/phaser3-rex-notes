import Base from './Base.js';
import { TREE_STATE } from '../constants.js';

class Blackboard extends Base {
    constructor({
        currentTimeKey = '$currentTime'
    } = {}) {
        super();

        this.currentTimeKey = currentTimeKey;
    }

    getTreeState(treeID) {
        return this.get(TREE_STATE, treeID);
    }

    setTreeState(treeID, state) {
        this.set(TREE_STATE, state, treeID);
        return this;
    }

    hasValidCurrentTime() {
        return this.has(this.currentTimeKey)
    }

    setCurrentTime(time) {
        this.set(this.currentTimeKey, time);
        return this;
    }

    getCurrentTime() {
        return this.get(this.currentTimeKey);
    }

    incCurrentTime(time) {
        this.inc(this.currentTimeKey, time);
        return this;
    }


};

export default Blackboard;
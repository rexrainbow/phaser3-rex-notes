import Base from './Base.js';
import { TREE_STATE, CURRENT_TIME } from '../constants.js';

class Blackboard extends Base {
    getTreeState(treeID) {
        return this.get(TREE_STATE, treeID);
    }

    setTreeState(treeID, state) {
        this.set(TREE_STATE, state, treeID);
        return this;
    }

    setCurrentTime(time) {
        this.set(CURRENT_TIME, time);
        return this;
    }

    incCurrentTime(time) {
        this.inc(CURRENT_TIME, time);
        return this;
    }

    getCurrentTime() {
        return this.get(CURRENT_TIME);
    }

};

export default Blackboard;
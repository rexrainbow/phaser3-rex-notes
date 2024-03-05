import Base from './Base.js';
import { TREE_STATE, CURRENT_TIME } from '../constants.js';

class Blackboard extends Base {
    getTreeData(treeID, key) {
        return this.get(key, treeID);
    }

    setTreeData(treeID, key, data) {
        this.set(key, data, treeID);
        return this;
    }

    getTreeState(treeID) {
        return this.getTreeData(treeID, TREE_STATE);
    }

    setTreeState(treeID, state) {
        this.setTreeData(treeID, TREE_STATE, state);
        return this;
    }

    setCurrentTime(time) {
        this.set(CURRENT_TIME, time);
    }

};

export default Blackboard;
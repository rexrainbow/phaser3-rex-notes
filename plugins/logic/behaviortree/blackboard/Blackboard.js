import Base from './Base.js';
import { TREE_STATE } from '../constants.js';
import GetValue from '../../../utils/object/GetValue.js';

class Blackboard extends Base {
    constructor(config) {
        super();

        this.currentTimeKey = GetValue(config, 'currentTimeKey', '$currentTime');
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
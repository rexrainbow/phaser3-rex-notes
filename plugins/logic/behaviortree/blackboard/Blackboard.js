import Base from './Base.js';
import { TREE_STATE } from '../constants.js';

class Blackboard extends Base {
    constructor(config) {
        super(config);

        var {
            currentTimeKey = '$currentTime'
        } = config;

        this.currentTimeKey = currentTimeKey;
        /*
        currentTime is required by built-in time-based nodes. 
        `Service`, `Wait`, `Cooldown`, and `TimeLimit` 
        use it to calculate elapsed time between ticks.
        */
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
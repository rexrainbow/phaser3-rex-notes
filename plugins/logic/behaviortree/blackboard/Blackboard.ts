import Base from './Base';
import { TREE_STATE } from '../constants';

class Blackboard extends Base {
    currentTimeKey: any;

    get: any;
    has: any;
    inc: any;
    set: any;

    constructor({
        currentTimeKey = '$currentTime'
    } = {}) {
        super();

        this.currentTimeKey = currentTimeKey;
    }

    getTreeState(treeID?: any) {
        return this.get(TREE_STATE, treeID);
    }

    setTreeState(treeID?: any, state?: any) {
        this.set(TREE_STATE, state, treeID);
        return this;
    }

    hasValidCurrentTime() {
        return this.has(this.currentTimeKey)
    }

    setCurrentTime(time?: any) {
        this.set(this.currentTimeKey, time);
        return this;
    }

    getCurrentTime() {
        return this.get(this.currentTimeKey);
    }

    incCurrentTime(time?: any) {
        this.inc(this.currentTimeKey, time);
        return this;
    }


};

export default Blackboard;
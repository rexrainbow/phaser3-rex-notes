import CONST from './const.js';

const BLOCKER = CONST.blocker;

var GetCost = function (curNode, preNode) {
    if (this.blockerTest) {
        if (this.board.hasBlocker(curNode.x, curNode.y)) {
            return BLOCKER;
        }
    }
    if (this.edgeBlockerTest) {
        // TODO
    }

    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curNode, preNode, this);
    } else {
        return this.costCallback(curNode, preNode, this);
    }
}
export default GetCost;
export default {
    // Internal method
    bindTaskActionNode(tick, node) {
        if (!this.__bindTick) {
            this.__bindTick = [];
            this.__bindNode = [];
        }

        this.__bindTick.push(tick);
        this.__bindNode.push(node);
    },

    // Internal method
    unBindTaskAction() {
        if (!this.__bindTick) {
            return;
        }

        this.__bindTick.pop();
        this.__bindNode.pop();
    },

    pauseEventSheet() {
        var node = this.__bindNode[this.__bindNode.length - 1];
        if (!node) {
            return null;
        }

        var tick = this.__bindTick[this.__bindTick.length - 1];
        return node.pauseEventSheet(tick);
    },

    pauseEventSheetUnitlEvent(eventEmitter, eventName) {
        var node = this.__bindNode[this.__bindNode.length - 1];
        if (!node) {
            return null;
        }

        var tick = this.__bindTick[this.__bindTick.length - 1];
        node.pauseEventSheetUnitlEvent(tick, eventEmitter, eventName);

        return this;
    }
}
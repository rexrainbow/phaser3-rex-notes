import NormalizeTrees from './NormalizeTrees.js';
import NodeEvents from './NodeEvents.js';
import {
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_LOG,
} from '../../constants.js';

export default {
    setTree(tree) {
        return this.setTrees(tree);
    },

    setTrees(trees) {
        var wasStarted = this.isStarted;
        if (this.isStarted) {
            this.stop();
        }

        this.trees = NormalizeTrees(undefined, trees);

        if (wasStarted) {
            this.start();
        }
        return this;
    },

    start() {
        if ((this.trees.length === 0) || this.isStarted) {
            return this;
        }

        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
            this.startTree(this.trees[i]);
        }

        this.isStarted = true;
        return this;
    },

    stop() {
        if ((this.trees.length === 0) || !this.isStarted) {
            return this;
        }

        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
            this.stopTree(this.trees[i]);
        }
        this._nodeEventHandlers = {};

        this.isStarted = false;
        return this;
    },

    startTree(tree) {
        if (this.autoEnable) {
            tree.setEventEnable(true);
        }

        tree.on(EVT_TICK_START, this.onTickStart, this);
        tree.on(EVT_TICK_END, this.onTickEnd, this);

        for (var i = 0, cnt = NodeEvents.length; i < cnt; i++) {
            var eventName = NodeEvents[i];
            var handler = this._nodeEventHandlers[eventName];
            if (!handler) {
                handler = this.createNodeEventHandler(eventName);
                this._nodeEventHandlers[eventName] = handler;
            }
            tree.on(eventName, handler, this);
        }

        tree.on(EVT_NODE_STATUS, this.onNodeStatus, this);
        tree.on(EVT_NODE_LOG, this.onNodeLog, this);
        return this;
    },

    stopTree(tree) {
        tree.off(EVT_TICK_START, this.onTickStart, this);
        tree.off(EVT_TICK_END, this.onTickEnd, this);

        for (var eventName in this._nodeEventHandlers) {
            tree.off(eventName, this._nodeEventHandlers[eventName], this);
        }

        tree.off(EVT_NODE_STATUS, this.onNodeStatus, this);
        tree.off(EVT_NODE_LOG, this.onNodeLog, this);
        return this;
    },
}

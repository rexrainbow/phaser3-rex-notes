import Composite from '../Composite.js';
import { RUNNING } from '../../constants.js';
import RemoveItem from '../../../../utils/array/Remove.js';

class SimpleParallel extends Composite {
    constructor(
        {
            finishMode = 0,
            children = [],
            name = 'SimpleParallel'
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                name,                
                properties: {
                    finishMode
                },
            },
            nodePool
        );

        this.finishMode = finishMode;
        this.mainTaskStatus = undefined;
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$runningChildren = this.children.map((child, index) => index);
        this.mainTaskStatus = RUNNING;
    }

    tick(tick) {
        var nodeMemory = tick.getNodeMemory();
        var childIndexes = nodeMemory.$runningChildren;
        var statusMap = {};
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
            var childIndex = childIndexes[i];
            var status = this.children[childIndex]._execute(tick);
            statusMap[childIndex] = status;

            // Save status of main task
            if (childIndex === 0) {
                this.mainTaskStatus = status;
            }
        }

        if (this.finishMode === 0) {
            if (this.mainTaskStatus !== RUNNING) {
                // Main task is not running
                // TODO: Abort running tasks
                for (var childIndex in statusMap) {
                    // this.children[childIndex].abort();
                }

                return this.mainTaskStatus;
            } else {
                // Clear not-running child
                for (var childIndex in statusMap) {
                    if (statusMap[childIndex] !== RUNNING) {
                        RemoveItem(childIndexes, childIndex);
                    }
                }
                return RUNNING;
            }
        } else {
            // Clear not-running child
            var hasAnyRunningChild = false;
            for (var childIndex in statusMap) {
                if (statusMap[childIndex] !== RUNNING) {
                    RemoveItem(childIndexes, childIndex);
                } else {
                    hasAnyRunningChild = true;
                }
            }

            if (!hasAnyRunningChild) {
                return this.mainTaskStatus;
            } else {
                return RUNNING;
            }
        }
    }
};

export default SimpleParallel;
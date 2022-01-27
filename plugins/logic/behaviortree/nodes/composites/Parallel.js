import Composite from '../Composite.js';
import { RUNNING } from '../../constants.js';
import RemoveItem from '../../../../utils/array/Remove.js';

class Parallel extends Composite {
    constructor(
        {
            finishMode = 0,
            children = [],
            title,
            name = 'Parallel'
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                title,
                name,
                properties: {
                    finishMode
                },
            },
            nodePool
        );

        this.finishMode = finishMode;
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$runningChildren = this.children.map((child, index) => index);
        nodeMemory.$mainTaskStatus = RUNNING;
    }

    tick(tick) {
        var nodeMemory = tick.getNodeMemory();
        var childIndexes = nodeMemory.$runningChildren;
        var statusMap = {};
        var hasAnyFinishStatus = false;
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
            var childIndex = childIndexes[i];
            var status = this.children[childIndex]._execute(tick);
            statusMap[childIndex] = status;

            if (status !== RUNNING) {
                hasAnyFinishStatus = true;

                if (childIndex === 0) {
                    nodeMemory.$mainTaskStatus = status;
                }
            }
        }

        // Clear none-running child
        if (hasAnyFinishStatus) {
            for (var childIndex in statusMap) {
                if (statusMap[childIndex] !== RUNNING) {
                    RemoveItem(childIndexes, parseInt(childIndex));
                }
            }
        }

        var mainTaskStatus = nodeMemory.$mainTaskStatus;
        if (this.finishMode === 0) {
            if (mainTaskStatus !== RUNNING) {
                // Main task is not running
                // TODO: Abort running tasks
                for (var childIndex in statusMap) {
                    // this.children[childIndex].abort();
                }
            }
            return mainTaskStatus;

        } else {
            var hasAnyRunningChild = false;
            for (var childIndex in statusMap) {
                if (statusMap[childIndex] === RUNNING) {
                    hasAnyRunningChild = true;
                    break;
                }
            }

            return (hasAnyRunningChild) ? RUNNING : mainTaskStatus;
        }
    }
};

export default Parallel;
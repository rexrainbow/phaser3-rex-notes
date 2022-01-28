import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING } from '../../constants.js';
import RemoveItem from '../../../../utils/array/Remove.js';

class Parallel extends Composite {
    constructor(
        {
            finishMode = 0,
            children = [],
            services,
            title,
            name = 'Parallel'
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                services,
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
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChildren = this.children.map((child, index) => index);
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndexes = nodeMemory.$runningChildren;
        var statusMap = {};
        var hasAnyFinishStatus = false;
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
            var childIndex = childIndexes[i];
            var status = this.children[childIndex]._execute(tick);
            statusMap[childIndex] = status;

            if (childIndex === 0) {
                nodeMemory.$mainTaskStatus = status;
            }
            if ((status === SUCCESS) || (status === FAILURE)) {
                hasAnyFinishStatus = true;
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
            return (childIndexes.length > 0) ? RUNNING : mainTaskStatus;
        }
    }

    abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var childIndexes = nodeMemory.$runningChildren;
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
            var childIndex = childIndexes[i];
            this.children[childIndex]._abort(tick);
        }
        nodeMemory.$runningChildren.length = 0;
    }
};

export default Parallel;
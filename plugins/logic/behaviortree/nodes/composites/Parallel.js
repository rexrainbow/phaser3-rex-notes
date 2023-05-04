import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';
import RemoveItem from '../../../../utils/array/Remove.js';

class Parallel extends Composite {
    constructor(
        {
            finishMode = 0,
            returnSuccess = true,
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
                    finishMode,
                    returnSuccess
                },
            },
            nodePool
        );

        this.finishMode = finishMode;
        this.returnSuccess = returnSuccess;
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
            return mainTaskStatus;
        } else {
            if (childIndexes.length > 0) {
                return RUNNING;
            } else if (this.returnSuccess) {
                return SUCCESS;
            } else {
                return mainTaskStatus;
            }
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
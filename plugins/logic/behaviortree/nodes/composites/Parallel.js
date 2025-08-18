import Composite from '../Composite.js';
import {
    SUCCESS, FAILURE, RUNNING, ABORT, ERROR,
    NEXTA, NEXTB, NEXTC, NEXTD
} from '../../constants.js';
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
        var hasAnyRunningStatus = false;
        var hasAnyAbortStatus = false;
        var hasAnyNextAStatus = false;
        var hasAnyNextBStatus = false;
        var hasAnyNextCStatus = false;
        var hasAnyNextDStatus = false;
        var hasAnyErrorStatus = false;
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
            var childIndex = childIndexes[i];
            var status = this.children[childIndex]._execute(tick);
            statusMap[childIndex] = status;

            if (childIndex === 0) {
                nodeMemory.$mainTaskStatus = status;
            }

            switch (status) {
                case SUCCESS:
                case FAILURE:
                    hasAnyFinishStatus = true;
                    break;

                case RUNNING:
                    hasAnyRunningStatus = true;
                    break;

                case ABORT:
                    hasAnyAbortStatus = true;
                    break;

                case ERROR:
                    hasAnyErrorStatus = true;
                    break;

                case NEXTA:
                    hasAnyNextAStatus = true;
                    break;
                case NEXTB:
                    hasAnyNextBStatus = true;
                    break;
                case NEXTC:
                    hasAnyNextCStatus = true;
                    break;
                case NEXTD:
                    hasAnyNextDStatus = true;
                    break;

            }
        }

        // Clear none-running child
        if (hasAnyFinishStatus) {
            for (var childIndex in statusMap) {
                var status = statusMap[childIndex];
                if ((status === SUCCESS) || (status === FAILURE)) {
                    RemoveItem(childIndexes, parseInt(childIndex));
                }
            }
        }

        if (this.finishMode === 0) {
            return nodeMemory.$mainTaskStatus;
        } else {
            if (hasAnyErrorStatus) {
                return ERROR;
            } else if (hasAnyAbortStatus) {
                return ABORT;
            } else if (hasAnyNextAStatus) {
                return NEXTA;
            } else if (hasAnyNextBStatus) {
                return NEXTB;
            } else if (hasAnyNextCStatus) {
                return NEXTC;
            } else if (hasAnyNextDStatus) {
                return NEXTD;
            } else if (hasAnyRunningStatus) {
                return RUNNING;
            } else if (this.returnSuccess) {
                return SUCCESS;
            } else {
                return nodeMemory.$mainTaskStatus;
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
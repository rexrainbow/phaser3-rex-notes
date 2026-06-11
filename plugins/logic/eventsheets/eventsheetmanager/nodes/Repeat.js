import Decorator from '../../../behaviortree/nodes/Decorator.js';
import CreateNumberExpression from '../../../behaviortree/nodes/expressions/CreateNumberExpression.js';
import { SUCCESS, ERROR, FAILURE } from '../../../behaviortree/constants.js';
import { EVT_REPEAT_ITERATION } from '../constants.js';

var EmitRepeatIteration = function (tick, node, iterationIndex, maxLoop, status) {
    var eventSheet = node.getTree(tick);
    if (!eventSheet) {
        return;
    }

    var eventSheetManager = eventSheet.eventSheetManager;
    if (!eventSheetManager) {
        return;
    }

    var eventSheetGroup = eventSheet.eventSheetGroup;
    var groupName = eventSheetGroup.name;

    eventSheetManager.emit(
        EVT_REPEAT_ITERATION,
        iterationIndex,
        maxLoop,
        status,
        eventSheet.title,
        groupName,
        eventSheetManager,
        eventSheet,
        node,
        eventSheetGroup
    );
}

class Repeat extends Decorator {

    constructor(config = {}, nodePool) {
        var maxLoop;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            maxLoop = expressions.maxLoop;

        } else {
            var {
                maxLoop: maxLoopValue = -1,  // expression
                child = null,
                title,
                properties,
                name = 'Repeat'
            } = config;

            super(
                {
                    child,
                    title,
                    properties,
                    name,
                },
                nodePool
            );

            maxLoop = maxLoopValue;
        }

        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);
        this.addExpression('maxLoop', this.maxLoop);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoop);
        nodeMemory.$i = 0;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = SUCCESS;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
            status = this.child._execute(tick);

            if ((status === SUCCESS) || (status === FAILURE)) {
                i++;
                EmitRepeatIteration(tick, this, i, maxLoop, status);
            } else {
                break;
            }
        }

        nodeMemory.$i = i;
        return status;
    }
};

export default Repeat;

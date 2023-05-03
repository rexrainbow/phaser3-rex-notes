import AddMarked from './AddMarked';
import { Parallel } from '../../nodes';

var LoadMarked = function (markedStringArray, taskHandlers) {
    /* taskHandlers: 
        {
            taskName: function(parameters, blackboard) {
                return eventEmitter; 
            }
        }
    */

    if (!Array.isArray(markedStringArray)) {
        markedStringArray = [markedStringArray];
    }

    if (taskHandlers === undefined) {
        taskHandlers = {};
    }

    var parentNode = new Parallel({ finishMode: 1 });
    for (var i = 0, cnt = markedStringArray.length; i < cnt; i++) {
        // Map this headingTree to a sequence node, with if-decorator
        // Add this sequence node to parallel node
        parentNode.addChild(AddMarked(markedStringArray[i], taskHandlers));
    }

    return parentNode;

}

export default LoadMarked
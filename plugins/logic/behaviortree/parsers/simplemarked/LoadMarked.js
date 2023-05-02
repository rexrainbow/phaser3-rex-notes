import AddMarked from './AddMarked';
import { Parallel } from '../../nodes';

var LoadMarked = function (markedStringArray, customNodeHandlers) {
    if (!Array.isArray(markedStringArray)) {
        markedStringArray = [markedStringArray];
    }
    if (customNodeHandlers === undefined) {
        customNodeHandlers = {};
    }

    var parentNode = new Parallel({ finishMode: 1 });
    for (var i = 0, cnt = markedStringArray.length; i < cnt; i++) {
        // Map this headingTree to a sequence node, with if-decorator
        // Add this sequence node to parallel node
        parentNode.addChild(AddMarked(markedStringArray[i], customNodeHandlers));
    }

    return parentNode;

}

export default LoadMarked
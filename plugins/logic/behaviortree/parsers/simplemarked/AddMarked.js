import GetHeadingTree from './GetHeadingTree.js';

var AddMarked = function (markedString, customNodeHandlers) {
    if (customNodeHandlers === undefined) {
        customNodeHandlers = {};
    }

    var headingTree = GetHeadingTree(markedString);
    // Map this headingTree to a sequence node, with if-decorator
    debugger;

}

export default AddMarked;
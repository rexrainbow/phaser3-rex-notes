var CreateInsertCursorChild = function (textObject) {
    var child = textObject.createCharChild('|');  // Use '|' to update render size
    child.text = '';  // Render empty string ''

    return child;
}

export default CreateInsertCursorChild;
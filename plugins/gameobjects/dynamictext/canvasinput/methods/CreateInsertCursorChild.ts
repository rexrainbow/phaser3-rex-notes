var CreateInsertCursorChild = function(textObject?: any) {
    var child = textObject.createCharChild('|');  // Use '|' to update render size
    child.text = '';  // Render empty string ''

    return child;
}

export default CreateInsertCursorChild;
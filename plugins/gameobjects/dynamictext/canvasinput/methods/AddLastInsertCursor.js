var AddLastInsertCursor = function (textObject) {
    var child = textObject.createCharChild('|');  // Use '|' to update render size
    child.text = '';  // Render empty string ''

    // Don't invoke 'addchar' event
    var typeSave = child.type;
    child.type = '';
    textObject.addChild(child);
    child.type = typeSave;

    return child;
}

export default AddLastInsertCursor;
var ClearCursor = function(hiddenTextEdit?: any) {
    var prevCursorPosition = hiddenTextEdit.prevCursorPosition;
    if (prevCursorPosition === null) {
        return;
    }

    var textObject = hiddenTextEdit.parent;

    var child = textObject.getCharChild(prevCursorPosition);
    if (child?: any) {
        textObject.emit('cursorout', child, prevCursorPosition, textObject);
    }

    hiddenTextEdit.prevCursorPosition = null;
}
export default ClearCursor;
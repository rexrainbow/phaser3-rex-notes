var OnSelectRange = function (hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    // var text = textObject.text;
    var selectionStart = hiddenTextEdit.selectionStart;
    var selectionEnd = hiddenTextEdit.selectionEnd;
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;

    if (prevSelectionStart === null) {  // First step
        for (var i = selectionStart; i < selectionEnd; i++) {
            var child = textObject.getCharChild(i);
            if (child) {
                textObject.emit('cursorin', child, i, textObject);
            }
        }
    } else if (!hiddenTextEdit.isOpened || (selectionStart === selectionEnd)) { // Last step
        for (var i = prevSelectionStart; i < prevSelectionEnd; i++) {
            var child = textObject.getCharChild(i);
            if (child) {
                textObject.emit('cursorout', child, i, textObject);
            }
        }
    } else {
        var min = Math.min(prevSelectionStart, selectionStart);
        var max = Math.max(prevSelectionEnd, selectionEnd);

        for (var i = min; i < max; i++) {
            var inPrevSelectionRange = (i >= prevSelectionStart) && (i < prevSelectionEnd);
            var inSelectionRange = (i >= selectionStart) && (i < selectionEnd);

            if (inPrevSelectionRange && inSelectionRange) {
                continue;
            }

            var child = textObject.getCharChild(i);
            if (child) {
                if (inPrevSelectionRange) {
                    textObject.emit('cursorout', child, i, textObject);
                } else {
                    textObject.emit('cursorin', child, i, textObject);
                }
            }
        }
    }
}

export default OnSelectRange;
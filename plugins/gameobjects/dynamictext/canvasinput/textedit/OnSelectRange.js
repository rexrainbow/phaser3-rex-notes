var OnSelectRange = function (hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    // var text = textObject.text;
    var selectionStart = hiddenTextEdit.selectionStart;
    var selectionEnd = hiddenTextEdit.selectionEnd;
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;

    if (prevSelectionStart === null) {  // First step
        var min = Math.min(selectionStart, selectionEnd);
        var max = Math.max(selectionStart, selectionEnd);

        for (var i = min; i <= max; i++) {
            var child = textObject.getCharChild(i);
            if (child) {
                textObject.emit('cursorin', child, i, textObject);
            }
        }
    } else if (!hiddenTextEdit.isOpened) { // Last step
        var min = Math.min(prevSelectionStart, prevSelectionEnd);
        var max = Math.max(prevSelectionStart, prevSelectionEnd);

        for (var i = min; i <= max; i++) {
            var child = textObject.getCharChild(i);
            if (child) {
                textObject.emit('cursorout', child, i, textObject);
            }
        }
    } else {
        var minPrevSelection = Math.min(prevSelectionStart, prevSelectionEnd);
        var maxPrevSelection = Math.max(prevSelectionStart, prevSelectionEnd);
        var minSelection = Math.min(selectionStart, selectionEnd);
        var maxSelection = Math.max(selectionStart, selectionEnd);
        var min = Math.min(minPrevSelection, minSelection);
        var max = Math.max(maxPrevSelection, maxSelection);

        for (var i = min; i <= max; i++) {
            var inPrevSelectionRange = (i >= minPrevSelection) && (i <= maxPrevSelection);
            var inSelectionRange = (i >= minSelection) && (i <= maxSelection);

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

    hiddenTextEdit.prevSelectionStart = (hiddenTextEdit.isOpened) ? selectionStart : null;
    hiddenTextEdit.prevSelectionEnd = (hiddenTextEdit.isOpened) ? selectionEnd : null;
}

export default OnSelectRange;
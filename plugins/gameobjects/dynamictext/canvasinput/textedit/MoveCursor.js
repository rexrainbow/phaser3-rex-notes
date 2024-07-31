import ScrollToBob from '../../dynamictext/bob/utils/ScrollToBob';

var MoveCursor = function (hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    var text = textObject.text;

    if (hiddenTextEdit.requestCursorPosition !== null) {
        hiddenTextEdit.setCursorPosition(hiddenTextEdit.requestCursorPosition);
        hiddenTextEdit.requestCursorPosition = null;
    }

    var cursorPosition = hiddenTextEdit.cursorPosition;
    if (hiddenTextEdit.prevCursorPosition === cursorPosition) {
        return;
    }

    if (hiddenTextEdit.prevCursorPosition !== null) {
        if (hiddenTextEdit.prevCursorPosition > text.length) {
            hiddenTextEdit.prevCursorPosition = null;
        }
    }

    if (hiddenTextEdit.prevCursorPosition !== null) {
        var child = textObject.getCharChild(hiddenTextEdit.prevCursorPosition);
        if (child) {
            // Rollback size of new line child
            if (child.text === '\n') {
                child.clearTextSize();
            }
            textObject.emit('cursorout', child, hiddenTextEdit.prevCursorPosition, textObject);
        }
    }
    if (cursorPosition != null) {
        var child = textObject.getCharChild(cursorPosition);
        if (child) {
            // Display new line child
            if (child.text === '\n') {
                child.copyTextSize(textObject.lastInsertCursor);
            }

            ScrollToBob(child);

            textObject.emit('cursorin', child, cursorPosition, textObject);
        }
    }
    textObject.emit('movecursor', cursorPosition, hiddenTextEdit.prevCursorPosition, textObject);

    hiddenTextEdit.prevCursorPosition = cursorPosition;
}

export default MoveCursor;
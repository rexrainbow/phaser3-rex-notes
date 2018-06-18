'use strict'

var addSingleDragEvent = function (gameObject) {
    if (!gameObject.on) {
        return gameObject;
    }

    var pointerId = undefined;
    var inputDragX = 0,
        inputDragY = 0;

    gameObject.on('dragstart', function (pointer, dragX, dragY) {
        if (pointerId !== undefined) { // dragged by other pointer
            return;
        }
        pointerId = pointer.id;
        inputDragX = pointer.x - gameObject.x;
        inputDragY = pointer.y - gameObject.y;
        gameObject.emit('rexdragstart', pointer, inputDragX, inputDragY);
    });

    gameObject.on('drag', function (pointer, dragX, dragY) {
        if (pointer.id !== pointerId) {
            return;
        }
        dragX = pointer.x - inputDragX;
        dragY = pointer.y - inputDragY;
        gameObject.emit('rexdrag', pointer, dragX, dragY);
    });

    gameObject.on('dragend', function (pointer, dragX, dragY, dropped) {
        if (pointer.id !== pointerId) {
            return;
        }
        pointerId = undefined;
        dragX = pointer.x - inputDragX;
        dragY = pointer.y - inputDragY;
        gameObject.emit('rexdragend', pointer, dragX, dragY, dropped);
    });

    return gameObject;
}
export default addSingleDragEvent;
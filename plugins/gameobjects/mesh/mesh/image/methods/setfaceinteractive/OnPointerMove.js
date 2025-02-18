var OnPointerMove = function (pointer, localX, localY, event) {
    var face = this.input.hitFace;
    var prevFace = this.input.prevHitFace;
    if (face === prevFace) {
        this.emit('face.pointermove', face, pointer, localX, localY, event);
        return
    }

    if (prevFace) {
        this.emit('face.pointerout', prevFace, pointer, event);
    }

    if (face) {
        this.emit('face.pointerover', face, pointer, event);
    }

    this.input.prevHitFace = face;
}

export default OnPointerMove;
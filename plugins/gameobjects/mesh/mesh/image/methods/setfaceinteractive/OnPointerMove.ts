var OnPointerMove = function(pointer?: any, localX?: any, localY?: any, event?: any) {
    var face = this.input.hitFace;
    var prevFace = this.input.prevHitFace;
    if (face === prevFace) {
        this.emit('face.pointermove', face, pointer, localX, localY, event);
        return
    }

    if (prevFace?: any) {
        this.emit('face.pointerout', prevFace, pointer, event);
    }

    if (face?: any) {
        this.emit('face.pointerover', face, pointer, event);
    }

    this.input.prevHitFace = face;
}

export default OnPointerMove;
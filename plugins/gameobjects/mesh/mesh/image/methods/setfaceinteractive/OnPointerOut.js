var OnPointerOut = function (pointer, event) {
    var face = this.input.prevHitFace;
    if (face) {
        this.emit('face.pointerout', face, pointer, event);
    }

    this.input.hitFace = null;
    this.input.prevHitFace = null;
}

export default OnPointerOut
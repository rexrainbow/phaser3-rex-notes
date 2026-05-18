var OnPointerOut = function(pointer?: any, event?: any) {
    var face = this.input.prevHitFace;
    if (face?: any) {
        this.emit('face.pointerout', face, pointer, event);
    }

    this.input.hitFace = null;
    this.input.prevHitFace = null;
}

export default OnPointerOut
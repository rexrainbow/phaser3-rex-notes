var OnPointerUp = function (pointer, localX, localY, event) {
    var face = this.input.hitFace;
    this.emit('face.pointerup', face, pointer, localX, localY, event);
    this.input.hitFace = null;
}

export default OnPointerUp;
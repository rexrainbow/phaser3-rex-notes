var OnPointerDown = function (pointer, localX, localY, event) {
    var face = this.input.hitFace;
    this.emit('face.pointerdown', face, pointer, localX, localY, event);
}

export default OnPointerDown;
var OnPointerDown = function(pointer?: any, localX?: any, localY?: any, event?: any) {
    var face = this.input.hitFace;
    this.emit('face.pointerdown', face, pointer, localX, localY, event);
}

export default OnPointerDown;
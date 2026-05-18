var OnPointerUp = function(pointer?: any, localX?: any, localY?: any, event?: any) {
    var face = this.input.hitFace;
    this.emit('face.pointerup', face, pointer, localX, localY, event);
    this.input.hitFace = null;
}

export default OnPointerUp;
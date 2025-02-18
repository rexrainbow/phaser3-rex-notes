var Contains = function (shape, x, y, gameObject) {
    var faces = gameObject.faces;
    for (var i = 0, cnt = faces.length; i < cnt; i++) {
        var face = faces[i];
        if (face.contains(x, y)) {
            gameObject.input.hitFace = face;
            return true;
        }
    }
    gameObject.input.hitFace = null;
    return false;
}

export default Contains;
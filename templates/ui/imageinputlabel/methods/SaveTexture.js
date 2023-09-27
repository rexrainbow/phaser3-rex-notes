var SaveTexture = function (key) {
    var canvas = this.childrenMap.canvas;
    canvas.generateTexture(key);

    return this;
}

export default SaveTexture;
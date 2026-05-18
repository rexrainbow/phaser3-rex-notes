var SaveTexture = function(key?: any) {
    var canvas = this.childrenMap.canvas;
    canvas.generateTexture(key);

    return this;
}

export default SaveTexture;
var DrawImage = function(key?: any, frame?: any, x?: any, y?: any, width?: any, height?: any) {
    var textureFrame = this.scene.sys.textures.getFrame(key, frame);

    if (!textureFrame) {
        return;
    }

    this.stamp(key, frame, x, y, {
        originX: 0,
        originY: 0,
        scaleX: width / textureFrame.realWidth,
        scaleY: height / textureFrame.realHeight
    });
}

export default DrawImage;
const FrameClass = Phaser.Textures.Frame;
var IsFrameObject = function (object) {
    return (object instanceof FrameClass);
}

export default IsFrameObject;
import { Textures as PhaserTextures } from 'phaser';
const FrameClass = PhaserTextures.Frame;
var IsFrameObject = function (object) {
    return (object instanceof FrameClass);
}

export default IsFrameObject;
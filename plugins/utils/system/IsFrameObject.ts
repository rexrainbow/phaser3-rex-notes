import { Textures as PhaserTextures } from 'phaser';
const FrameClass = PhaserTextures.Frame;
var IsFrameObject = function(object?: any) {
    return (object instanceof FrameClass);
}

export default IsFrameObject;
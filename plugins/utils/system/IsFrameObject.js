import { Textures } from "phaser";
const FrameClass = Textures.Frame;
var IsFrameObject = function (object) {
    return (object instanceof FrameClass);
}

export default IsFrameObject;
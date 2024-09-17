import { Textures } from "phaser";
const TextureClass = Textures.Texture;
var IsTextureObject = function (object) {
    return (object instanceof TextureClass);
}

export default IsTextureObject;
import { Textures as PhaserTextures } from 'phaser';
const TextureClass = PhaserTextures.Texture;
var IsTextureObject = function(object?: any) {
    return (object instanceof TextureClass);
}

export default IsTextureObject;
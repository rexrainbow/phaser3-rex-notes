const TextureClass = Phaser.Textures.Texture;
var IsTextureObject = function (object) {
    return (object instanceof TextureClass);
}

export default IsTextureObject;